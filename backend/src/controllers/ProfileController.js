const connection = require('../database/connection'); //importando o arquivo de conexões

module.exports = {
  //listando todos os casos que foram criados por uma ong em específica
  async index(request, response) {
    const ong_id = request.headers.authorization; //pegando o id da ong que criou o caso

    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*');

    return response.json(incidents);
  }
};