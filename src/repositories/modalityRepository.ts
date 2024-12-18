import { buildLogger } from '../plugin/logger';
import db from './pg-connection';

const logger = buildLogger('modalityRepository');

const TABLE_NAME = 'modalities';
export const getModalities = async () => {
  try {
    logger.debug(`Fetching modalities from table: ${TABLE_NAME}`);
    const modalities = await db(TABLE_NAME).select('*');

    if (modalities.length === 0) {
      logger.debug('No modalities found');
    }
    logger.debug(`Retrieved ${modalities.length} modalities`);
    return modalities;
  } catch (error) {
    logger.error(`Error fetching modalities: ${error}`);
    throw error;
  }
};
