const express = require('express'); //importando as funcionalidades do express
const cors = require('cors'); 
const { errors } = require('celebrate'); //importando o método do celebrate responsável por mostrar erros
const routes = require('./routes'); //importando o arquivo de rota

const app = express();

app.use(cors()); //Políticar de CORS

app.use(express.json()); //utilizando o formato JSON para lidar com os dados

app.use(routes); //fazendo uso das rotas

app.use(errors()); //mensagens personalidas de erros nas validaçõesdo backend

module.exports = app;