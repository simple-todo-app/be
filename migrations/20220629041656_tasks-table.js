exports.up = (knex) => {
  return knex.schema
  .createTable('users', (tbl) => {
    tbl.increments('user_id');
    tbl.string('email')
      .notNullable()
      .unique();
    tbl.string('password')
      .notNullable();
  })
  .createTable('tasks', (tbl) => {
    tbl.increments('task_id');
    tbl.string('title')
      .notNullable();
    tbl.boolean('completed')
      .defaultTo(false);
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

exports.down = (knex) => {
  return knex.schema
      .dropTableIfExists('tasks')
      .dropTableIfExists('users')
}