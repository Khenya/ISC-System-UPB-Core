import * as ModalityService from '../services/modalityService';
import { buildLogger } from '../plugin/logger';
import { NotFoundError } from '../errors/notFoundError';

const logger = buildLogger('modalityInteractor');

export const getModalities = async () => {
  logger.debug('Fetching modalities');
  const modalities = await ModalityService.getGraduationProcessById();

  if (!modalities) {
    logger.info('No professors found');
    throw new NotFoundError('There are no modalities');
  }
  logger.info('Modalities fetched successfully');
  return modalities;
};
