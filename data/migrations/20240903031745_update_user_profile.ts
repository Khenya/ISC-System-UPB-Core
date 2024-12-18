import type { Knex } from 'knex';

const userProfileTable = 'user_profile';
const studentTable = 'students';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(userProfileTable, table => {
    table.string('code').nullable();
  });
  await knex.schema.alterTable(studentTable, table => {
    table.dropColumn('code');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(userProfileTable, table => {
    table.dropColumn('code');
  });
  await knex.schema.alterTable(studentTable, table => {
    table.string('code').notNullable();
  });
}
