const { create } = require("./IncidentController");

const connection = require('../database/connection'); //importando o arquivo de conexões

module.exports = {
  //verificando se o id q esta tentando logar no front, realmente existe no banco de dados
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();

    if(!ong) {
      return response
      .status(400)
      .json({ error: 'ONG contendo esse ID não está cadastrada' });
    }
    
    return response.json(ong);
  }
};