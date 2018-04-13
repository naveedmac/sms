exports.up = function(knex, Promise) {
  return knex.schema.createTable('role', table => {
    table.increments('role_id');
    table.string('role_name');
    table.string('role_description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
