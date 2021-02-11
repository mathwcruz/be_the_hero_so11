const connection = require('../database/connection'); //importando o arquivo de conexões

module.exports = {
  //método para listar todos os casos do banco
  async index(request, response) {
    const { page = 1 } = request.query; //paginação

    const [count] = await connection('incidents').count(); //contando quantos casos há cadastrados

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5) //no máximo 5 páginas
    .offset((page - 1) * 5) //vai mostrar de 5 em 5 na paginação
    .select([
      'incidents.*', 
      'ongs.name', 
      'ongs.email', 
      'ongs.whatsapp', 
      'ongs.city', 
      'ongs.uf'
    ]); //pegando todos os campos da tabela 'incidents' e alguns da tabela de ongs para mostrar no front

    response.header('X-Total-Count', count['count(*)']); //retornando o total de casos cadastrados

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
    }); //inserindo os dados passado do front para a tabela de casos

    return response.json({ id }); //retornando o id do caso criado
  },

  //método para deletar um caso já cadastrado
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization; //pegando o id da ong que havia criado o caso

    const incident = await connection('incidents')
      .where('id', id) //buscando no banco de incidents o id que for igual ao id que está sendo passado lá do front end
      .select('ong_id') //pegando a coluna de id da ong que havia criado o caso
      .first();

    if (incident.ong_id != ong_id) { //se o id da ong que havia criado o caso for diferente do id da ong que está tentando deletar o caso, entra na condição
      return response.status(401).json({ error: 'Operação não permitida' }); //retornando um status para informar que o usuário não está autorizado a realizar a ação
    }

    await connection('incidents')
    .where('id', id)
    .delete(); //deletando o caso do banco de dados de indicents

    return response.status(204).send(); //retornando status OK após realizar a ação
  }
};