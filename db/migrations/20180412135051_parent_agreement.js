exports.up = function(knex, Promise) {
  return knex.schema.createTable('parent_agreement', table => {
    table
      .integer('agreement_id')
      .references('agreement.agreement_id')
      .notNull()
      .onDelete('CASCADE');
    table
      .integer('parent_id')
      .references('parent.parent_id')
      .notNull()
      .onDelete('CASCADE');
    table
      .integer('academic_year_id')
      .references('academic_year.academic_year_id')
      .notNull()
      .onDelete('CASCADE');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parent_agreement');
};
