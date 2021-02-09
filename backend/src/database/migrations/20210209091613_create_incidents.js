
exports.up = function(knex) {
  //criando a tabela de ongs com as seguintes informações:
  return knex.schema.createTable('incidents', (table) => {
    table.increments(); //chave primária

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //relacionamento com a tabela ongs

    table.foreign('ong_id').references('id').inTable('ongs'); //criando a chave estrangeira da tabela 'incidents'
  });
};

//se der algum problema, irá deletar essa tabela (incidents)
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
