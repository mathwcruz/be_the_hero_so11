const connection = require('../database/connection'); //importando o arquivo de conexões

module.exports = {
  //verificando se o id da ong que esta tentando logar no front está cadastrado no banco de dados
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first(); //pegando o nome da ong que está tentando logar

    if(!ong) {
      return response.status(400).json({ error: 'ONG contendo esse ID não está cadastrada' }); //retornando um status 404 caso o ID não tenha sido encontrado no banco
    }
    
    return response.json(ong);
  }
};