const express = require('express'); //importando todas as funcionalidades do express

const { celebrate, Segments, Joi } = require('celebrate'); //importando o celebrate para realizar validações

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //desacoplando o método de rotas do express

/* CONFIGURANDO AS ROTAS */

//rota de login
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required().length(8),
  }),
}), SessionController.create);

//rota para listar todas as ongs
routes.get('/ongs', OngController.index);

//rota para cadastro de uma nova ong
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(), //nome será uma string obrigatória
    email: Joi.string().required().email(), //email será uma string obrigatório com formato de e-mail
    whatsapp: Joi.string().required().min(10).max(11), //num. do whats será um número obrigatório com no mín. 10 digitos e no máx. 11 dígitos
    city: Joi.string().required(),
    uf: Joi.string().required().length(2) //UF será uma string obrigatória com 2 caracteres
  })
}), OngController.create);

//rota para listar um caso específico de uma ong
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index)

//rota para listar todos os casos
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), IncidentController.index);

//rota para cadastro de um novo caso
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(), //o ID da ONG enviada será uma string obrigatória
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
}), IncidentController.create);

//rota para deletar um caso da ong
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentController.delete);

module.exports = routes; //exportando as rotas