exports.up = function(knex, Promise) {
  return knex.schema.createTable('allergy', table => {
    table.increments('allergy_id');
    table.string('allergy_name');
    table.string('allergy_description');
    table.string('allergy_care_needed');
    table
      .integer('student_id')
      .references('student.student_id')
      .notNull()
      .onDelete('CASCADE');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('learning_challenge');
};
