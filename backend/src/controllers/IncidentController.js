const connection = require('../database/connection'); //importando o arquivo de conexões

module.exports = {
  //método para listar todos os casos do banco
  async index(request, response) {
    const incidents = await connection('incidents').select('*'); //pegando todos os campos da tabela 'incidents'

    return response.json(incidents); //retornando os dados
  },

  //método para criar um novo caso
  async create(request, response) {
    const { title, description, value } = request.body; //informações para criar um novo caso

    const ong_id = request.headers.authorization; //pegando o id da ong que criou o caso

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    }); //inserindo os dados na tabela de casos

    return response.json({ id }); //retornando o id do caso criado
  },

  //método para deletar um caso já cadastrado
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization; //pegando o id da ong que criou o caso

    const incident = await connection('incidents')
      .where('id', id) //buscando no banco de incidents o id que for igual ao id que está sendo passado lá do front end
      .select('ong_id') //pegando a coluna de id da ong que criou o caso
      .first();

    if (incident.ong_id != ong_id) { //se o id da ong que criou o caso for diferente do id da ong que está tentando deletar o caso, entra na condição
      return response.status(401).json({ error: 'Operação não permitida' }); //retornando um status para informar que o usuário não está autorizado a realizar a ação
    }

    await connection('incidents').where('id', id).delete(); //deletando o caso do banco de dados de indicents

    return response.status(204).send();
  }
};