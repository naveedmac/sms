exports.up = function(knex, Promise) {
  return knex.schema.createTable('agreement', table => {
    table.increments('agreement_id');
    table.string('agreement_name');
    table.string('agreement_description');

    table
      .integer('academic_year_id')
      .references('academic_year.academic_year_id')
      .notNull()
      .onDelete('CASCADE');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('agreement');
};
