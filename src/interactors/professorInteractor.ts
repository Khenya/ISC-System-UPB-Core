import * as UserService from '../services/userService';

import { buildLogger } from '../plugin/logger';
import { NotFoundError } from '../errors/notFoundError';
import createProfessorRequest from '../dtos/createProfessorRequest';
import { createProfessorService } from '../services/professorService';
import * as userProfileService from '../services/userProfileService';
const logger = buildLogger('professorInteractor');

export const getProfessors = async () => {
  logger.debug('Fetching professors');
  const professors = await UserService.getProfessors();

  if (!professors) {
    logger.info('No professors found');
    throw new NotFoundError('There are no professors');
  }

  logger.info('Professors fetched successfully');
  return professors;
};

export const createProfessor = async (professorData: createProfessorRequest) => {
  try {
    logger.info('Creating professor with data:', { professorData });
    const newUserProfile = await userProfileService.createUserProfile(professorData);
    const { id } = newUserProfile;
    professorData.id = id;
    const newProfessor = await createProfessorService(professorData);
    return newProfessor;
  } catch (error) {
    console.error('Error in createProfessor interactor:', error);
    throw new Error('Error creating the professor');
  }
};

export const getProfessorById = async (id: string) => {
  logger.debug('Fetching professor by id:', { id });
  try {
    const professor = await UserService.getProfessorById(id);
    logger.debug('Professor fetched successfully:', { id });
    return professor;
  } catch (error) {
    logger.error('Error in getProfessorById interactor:', {
      id,
      message: (error as Error).message,
    });
    throw new Error(`Error fetching the professor with id: ${id}`);
  }
};
