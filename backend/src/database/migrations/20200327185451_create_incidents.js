
exports.up = function(knex) {
	return knex.schema.createTable('incidents', function(table){
		//  criando chave primary com alto incremento
		 table.increments();

		 table.string('title').notNullable();
		 table.string('description').notNullable();
		 table.decimal('value').notNullable();
		// armazenando qual ong criou o determinado incidente
		 table.string('ong_id').notNullable();
		// chave estrangeira
		 table.foreign('ong_id').references('id').inTable('ongs');
	 });
   };
   
   exports.down = function(knex) {
	return knex.schema.dropTable('incidents');
   };
   