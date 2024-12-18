import { NotFoundError } from '../errors/notFoundError';
import * as StatsService from '../services/statsService';

export const getStats = async () => {
  const stats = await StatsService.getStats();

  if (!stats) {
    throw new NotFoundError('There are no stats');
  }

  return stats;
};
