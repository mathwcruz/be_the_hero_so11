const knex = require('knex'); //importando o knex
const configuration = require('../../knexfile'); //importando as confirações do arquivo knex.js

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development; //setando configuração de desenvolvimento ou de teste

const connection = knex(config) //criando uma conexão, ou de desenvolvimento ou de teste

module.exports = connection;