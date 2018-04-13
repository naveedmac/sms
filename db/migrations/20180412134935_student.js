exports.up = function(knex, Promise) {
  return knex.schema.createTable('student', table => {
    table.increments('student_id');
    table.string('student_name');
    table.string('student_gender');
    table.date('student_dob');
    table.string('student_care_card_number');
    table.timestamps(false, true);
    table
      .integer('parent_id')
      .references('parent.parent_id')
      .notNull()
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('student');
};
