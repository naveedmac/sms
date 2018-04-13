exports.up = function(knex, Promise) {
  return knex.schema.createTable('fee', table => {
    table.increments('fee_id');
    table.float('amount_received');
    table.float('amount_payble');
    table.string('admin_remarks');
    table.string('parents_request');
    table.date('date');
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
  return knex.schema.dropTable('fee');
};
