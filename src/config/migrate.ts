import knex, { Knex } from 'knex';
import knexConfig from '../knexfile';
import { buildLogger } from '../plugin/logger';

const environment = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexConfig[environment];
const db = knex(config);

const logger = buildLogger('userService');

async function checkDatabaseConnection(): Promise<void> {
  try {
    await db.raw('SELECT 1+1 AS result');
    logger.info(`[${environment}] Database connection successful`);
  } catch (err) {
    const error = err as Error;
    logger.error(`[${environment}] Database connection failed: ${error.message}`);
    throw error;
  }
}

export async function runMigrations(): Promise<void> {
  await checkDatabaseConnection();
  try {
    await db.migrate.latest();
    logger.info(`[${environment}] Migrations ran successfully at ${new Date().toISOString()}`);
  } catch (err) {
    const error = err as Error;
    logger.error(`[${environment}] Error running migrations at ${new Date().toISOString()}`, {
      message: error.message,
      stack: error.stack || '',
    });
  } finally {
    try {
      await db.destroy();
      logger.info('Database connection closed successfully.');
    } catch (destroyErr) {
      const error = destroyErr as Error;
      logger.error('Error closing the database connection', {
        message: error.message,
        stack: error.stack || '',
      });
    }
  }
}
