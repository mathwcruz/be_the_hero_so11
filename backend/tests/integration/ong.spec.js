const request = require('supertest'); //importando o supertest
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); //desfazendo as migrations, para nao sobrecarregar
    await connection.migrate.latest(); //executando as migrations do knex
  });

  afterAll(async () => {
     await connection.destroy(); //"desligando" a conexão com o knex
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "APAD@teste",
      email: "contato@teste.com.br",
      whatsapp: "99999999999",
      city: "Rio do Vale",
      uf: "RS"
    })

    expect(response.body) //espero que dentro do response.body
    .toHaveProperty('id') //tenha uma propriedade chamda id

    expect(response.body.id) //espero que o id vindo do body da resposta da api
    .toHaveLength(8); //tenha 8 caracteres
  });
});