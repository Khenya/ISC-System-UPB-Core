import { Request, Response } from 'express';
import * as ProfessorInteractor from '../interactors/professorInteractor';
import { buildLogger } from '../plugin/logger';
import { handleError } from '../handlers/errorHandler';
import { sendCreated, sendSuccess } from '../handlers/successHandler';
import createProfessorRequest from '../dtos/createProfessorRequest';

const logger = buildLogger('professorController');

export const getProfessorsController = async (req: Request, res: Response) => {
  try {
    const professors = await ProfessorInteractor.getProfessors();

    if (professors.length === 0) {
      logger.info('No professors found');
      return res.status(404).json({ success: false, message: 'No professors found' });
    }

    logger.info('Professors retrieved successfully');
    sendSuccess(res, professors, 'Professors retrieved successfully');
  } catch (error) {
    logger.error(`Error in getProfessorsController: ${error}`);
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createProfessor = async (req: Request, res: Response) => {
  try {
    const professorData: createProfessorRequest = req.body;
    const newProfessor = await ProfessorInteractor.createProfessor(professorData);
    sendCreated(res, { profesor: newProfessor }, 'Professor created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getProfessorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const professor = await ProfessorInteractor.getProfessorById(id);
    logger.info('Professor retrieved successfully');
    sendSuccess(res, professor, 'Professor retrieved successfully');
  } catch (error) {
    logger.error(`Error in getProfessorById for id ${id}: ${error}`);
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
