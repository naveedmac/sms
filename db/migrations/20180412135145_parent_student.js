exports.up = function(knex, Promise) {
  return knex.schema.createTable('parent_student', table => {
    table
      .integer('student_id')
      .references('student.student_id')
      .notNull()
      .onDelete('CASCADE');
    table
      .integer('parent_id')
      .references('parent.parent_id')
      .notNull()
      .onDelete('CASCADE');

    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parent_student');
};
