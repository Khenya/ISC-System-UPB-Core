import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('roles', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.boolean('disabled').notNullable().defaultTo(false);
      table.string('category').notNullable();
      table.timestamps(true, true);
    })
    .createTable('permission_categories', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    })
    .createTable('permissions', function (table) {
      table.increments('id').primary();
      table.string('description').notNullable();
      table.string('display_name').notNullable();
      //TODO: Make it unique when every permission has its own path
      table.string('path').notNullable();
      table.integer('sort').notNullable();
      table.string('name').notNullable();
      table.enu('type', ['page', 'action']).notNullable();
      table.boolean('disabled').notNullable().defaultTo(false);
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('permission_categories')
        .onDelete('CASCADE');
      table.timestamps(true, true);
      table.timestamp('deleted_at').nullable();
    })
    .createTable('role_permissions', function (table) {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE');
      table.primary(['role_id', 'permission_id']);
    })
    .createTable('user_profile', function (table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('name').notNullable();
      table.string('lastname').notNullable();
      table.string('mothername').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone').notNullable();
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable('students', function (table) {
      table
        .integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.string('code').notNullable().unique();
      table.boolean('is_scholarship').defaultTo(false);
    })
    .createTable('professors', function (table) {
      table
        .integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.string('degree');
      table.string('department').notNullable();
      table.string('specialty').notNullable();
    })
    .createTable('user_roles', function (table) {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      table.primary(['user_id', 'role_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('user_roles')
    .dropTableIfExists('teachers')
    .dropTableIfExists('students')
    .dropTableIfExists('user_profile')
    .dropTableIfExists('role_permissions')
    .dropTableIfExists('permissions')
    .dropTableIfExists('roles');
}
