import type { Knex } from 'knex';

const tableNameIntern = 'interns';
const tableNameEvents = 'events';
const tableNameEventsInterns = 'events_interns';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tableNameIntern, function (table) {
      table.increments('id').primary();
      table
        .integer('user_profile_id')
        .unsigned()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.integer('total_hours').unsigned().defaultTo(0);
      table.integer('pending_hours').unsigned().defaultTo(0);
      table.integer('completed_hours').unsigned().defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now(6));
    })
    .createTable(tableNameEvents, function (table) {
      table.increments('id').primary();
      table
        .integer('responsible_intern_id')
        .unsigned()
        .references('id')
        .inTable('interns')
        .onDelete('CASCADE').nullable;
      table.string('title');
      table.string('description');
      table.string('location');
      table.integer('duration_hours');
      table.integer('max_interns');
      table.integer('min_interns');
      table.integer('assigned_hours');
      table.timestamp('start_date');
      table.timestamp('end_date');
      table.timestamp('registration_deadline');
      table.timestamp('start_cancellation_date');
      table.timestamp('end_cancellation_date');
      table.timestamp('created_at').defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now(6));
    })
    .createTable(tableNameEventsInterns, function (table) {
      table
        .integer('intern_id')
        .unsigned()
        .references('id')
        .inTable(tableNameIntern)
        .onDelete('CASCADE');
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable(tableNameEvents)
        .onDelete('CASCADE');
      table.enu('type', ['accepted', 'rejected', 'pending', 'reserve']).notNullable();
      table.boolean('attendance').defaultTo(false);
      table.string('notes');
      table.timestamp('created_at').defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now(6));
      table.primary(['intern_id', 'event_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(tableNameIntern)
    .dropTableIfExists(tableNameEvents)
    .dropTableIfExists(tableNameEventsInterns);
}
