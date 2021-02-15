const crypto = require('crypto'); //importando o pacote responsável por criar um ID aleátorio para cada ong
const connection = require('../database/connection'); //importando o arquivo de conexões

const generateUniqueID = require('../utils/generateUniqueId');

module.exports = {
  //método para listar todas as ongs do banco
  async index(request, response) {
    const ongs = await connection('ongs').select('*'); //pegando todos os campos da tabela 'ongs'
  
    return response.json(ongs); //retornando os dados
  },

  //método para criar uma nova ong
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body; //desestrturando as informações cadastrais de uma ong

    const id = generateUniqueID() //criando um id aleatório, hexadecimal, com 4 bytes, chamando a função

    await connection('ongs').insert({ //inserindo na tabela ongs, as informações adquiridas no front
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id }); //devolvendo o id do cliente, ao ser cadastrado
  }
};