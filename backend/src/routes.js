const express = require('express'); //importando todas as funcionalidades do express

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

const routes = express.Router(); //desacoplando o método de rotas do express

/* CONFIGURANDO AS ROTAS */
//rota para listar todas as ongs
routes.get('/ongs', OngController.index);

//rota para cadastro de uma nova ong
routes.post('/ongs', OngController.create);

//rota para listar todos os casos
routes.get('/incidents', IncidentController.index);

//rota para cadastro de um novo caso
routes.post('/incidents', IncidentController.create);

//rota para deletar um caso da ong
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes; //exportando as rotas