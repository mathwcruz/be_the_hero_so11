const knex = require('knex'); //importando o knex
const configuration = require('../../knexfile'); //importando as confirações do arquivo knex.js

const connection = knex(configuration.development) //criando uma conexão de desenvolvimento

module.exports = connection;