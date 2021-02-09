
exports.up = function(knex) {
  //criando a tabela de ongs com as seguintes informações:
  return knex.schema.createTable('ongs', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //uf com no máximo 2 caracteres
  });
};

//se der algum problema, irá deletar essa tabela (ongs)
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
