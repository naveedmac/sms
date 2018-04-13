exports.up = function(knex, Promise) {
  return knex.schema.createTable('learning_challenge', table => {
    table.increments('learning_challenge_id');
    table.string('learning_challenge_name');
    table.string('learning_challenge_description');
    table.string('learning_challenge_care_needed');
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
