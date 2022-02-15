const router = require('express').Router();
const Person = require('../models/Person.js');

//para uma api rest eu tento usar a mes url mudando os metodos 
//create 
router.post('/', async (req, res) => {

    const {
        name,
        salary,
        approved
    } = req.body;


    if (!name) {
        return res.status(422).json({
            error: 'O nome é obrigatorio'
        });
    }
    if (!salary) {
        return res.status(422).json({
            error: 'O salario é obrigatorio'
        });
    }


    const person = {
        name,
        salary,
        approved
    }

    //create do mongoose
    try {
        await Person.create(person);

        return res.status(201).json({
            message: 'Pessoa inserida com sucesso'
        });

    } catch (e) {
        return res.status(500).json({
            error: e
        });
    }

});
//find all
router.get("/", async (req, res) => {
    try {
        const people = await Person.find();
        return res.status(200).json(people);
    } catch (e) {
        return res.status(422).json({
            error: e
        })
    }
})
//find by id
router.get('/:id', async (req, res) => {
    //extrair o dado da requisição
    const id = req.params.id;


    try {
        const person = await Person.findOne({
            _id: id
        });

        if (!person) {
            return res.status(422).json({
                message: 'O usuario não foi encontrado'
            })
        }

        return res.status(200).json(person);

    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }
})

//update (put e patch)

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const {
        name,
        salary,
        approved
    } = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatePerson = await Person.updateOne({
            _id: id
        }, person);

        console.log(updatePerson);
        if (updatePerson.matchedCount === 0) {
            return res.status(422).json({
                message: 'Usuario não foi foi encontrado!'
            });
        }
        res.status(200).json(person);

    } catch (error) {
        res.status(422).json({
            error: error
        });
    }
})

//delete (router.delete)
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const person = await Person.findOne({
        _id: id
    });

    if (!person) {
        return res.status(422).json({
            message: "Usuario não existe"
        });
    }
    try {
        await Person.deleteOne({
            _id: id
        });

        res.status(200).json({
            message: "Usuario removido com sucesso"
        });

    } catch (err) {
        return res.status(422).json({
            error: err
        });
    }

});
module.exports = router;