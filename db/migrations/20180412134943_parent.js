exports.up = function(knex, Promise) {
  return knex.schema.createTable('parent', table => {
    table.increments('parent_id');
    table.string('father_name');
    table.string('father_cell_number');
    table.string('father_email');
    table.string('mother_name');
    table.string('mother_email');
    table.string('mother_cell_number');
    table.string('emergency_contact_person_1');
    table.string('emergency_contact_number_1');
    table.string('relationship_contact_person_1');
    table.string('emergency_contact_person_2');
    table.string('emergency_contact_number_2');
    table.string('relationship_contact_person_2');
    table
      .integer('user_id')
      .references('user.user_id')
      .notNull()
      .onDelete('CASCADE');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parent');
};
