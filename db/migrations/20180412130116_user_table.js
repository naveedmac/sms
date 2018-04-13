exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id');
    table
      .string('email')
      .unique()
      .notNull();
    table
      .string('username')
      .unique()
      .notNull();
    table.string('passwordDigest').notNull();
    table
      .integer('role_id')
      .references('role.role_id')
      .notNull()
      .onDelete('CASCADE');

    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
