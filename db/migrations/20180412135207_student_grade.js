exports.up = function(knex, Promise) {
  return knex.schema.createTable('student_grade', table => {
    table
      .integer('grade_id')
      .references('grade.grade_id')
      .notNull()
      .onDelete('CASCADE');
    table
      .integer('student_id')
      .references('student.student_id')
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
  return knex.schema.dropTable('student_grade');
};
