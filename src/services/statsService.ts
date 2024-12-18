import Stats from '../models/statsInterface';
import * as StatsRepository from '../repositories/statsRepository';

export const getStats = async (): Promise<Stats> => {
  return await StatsRepository.getStats();
};
