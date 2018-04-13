exports.up = function(knex, Promise) {
  return knex.schema.createTable('academic_year', table => {
    table.increments('academic_year_id');
    table.string('academic_year');
    table.string('academic_year_description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('academic_year');
};
