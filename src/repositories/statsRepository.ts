import { buildLogger } from '../plugin/logger';
import db from './pg-connection';

const logger = buildLogger('statsRepository');

export const getStats = async () => {
  try {
    logger.info('Fetching stats');
    const result = await db.raw('SELECT * FROM get_tutorias_reviewers_stats()');
    logger.debug('Stats fetched:', result.rows[0]);
    const stats = result.rows[0];
    return stats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
