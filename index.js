require("dotenv").config();

//config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//forma de ler JSON

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

//rota inicial
app.get("/", (req, res) => {
  //requisição
  res.json({
    //mesma coisa do send
    message: `${process.env.NODE_ENV}`,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dsejy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("connectamos ao mongo db");
  })
  .catch((err) => console.log(err));
