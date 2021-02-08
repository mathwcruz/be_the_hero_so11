const express = require('express'); //importando todas as funcionalidades do express

const routes = express.Router(); //desacoplando o método de rotas do express

//CONFIGURANDO AS ROTAS

/*
Tipos de parâmetros:
  Query Parms: parâetros nomeados enviados na rota após o simbolo '?', geralmente servem para filtro, paginação
  Route Parms: parâmetros utilizados para identificar recursos
  Request Body: Corpo da requisição utilizado para criar ou alterar recursos
*/

routes.post('/users', (request, response) => {
  const body = request.body;

  console.log(body);
  return response.json({
    evento: 'SO11',
    aluno: 'matheus'
  });
});

module.exports = routes; //exportando as rotas