import { Request, Response } from 'express';
import * as GraduationProcessInteractor from '../interactors/graduationInteractor';
import createGraduationProcessRequest from '../dtos/createGraduationProcessRequest';
import { handleError } from '../handlers/errorHandler';
import { sendCreated, sendSuccess } from '../handlers/successHandler';

export const getGraduationProcessByIdController = async (req: Request, res: Response) => {
  const processId = parseInt(req.params.id);

  try {
    const graduationProcess = await GraduationProcessInteractor.getGraduationProcessById(processId);
    if (!graduationProcess) {
      return res.status(404).json({ success: false, message: 'Graduation process not found' });
    }
    sendSuccess(res, graduationProcess, 'Graduation process retrieved successfully');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateGraduationProcessController = async (req: Request, res: Response) => {
  const processId = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const updatedGraduationProcess = await GraduationProcessInteractor.updateGraduationProcess(
      processId,
      updatedData
    );
    if (!updatedGraduationProcess) {
      return res.status(404).json({ success: false, message: 'Graduation process not found' });
    }
    sendSuccess(res, updatedGraduationProcess, 'Graduation process updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createGraduationProcessController = async (req: Request, res: Response) => {
  const graduationProcess: createGraduationProcessRequest = req.body;

  try {
    const newGraduationProcess =
      await GraduationProcessInteractor.createGraduationProcess(graduationProcess);
    sendCreated(res, newGraduationProcess, 'Graduation process created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getGraduationProcessesController = async (req: Request, res: Response) => {
  try {
    // const graduationProcesses = await GraduationProcessInteractor.getGraduationProcesses();
    sendSuccess(res, [], 'Graduation processes retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createDefenseController = async (req: Request, res: Response) => {
  const processId = parseInt(req.params.id);
  const defenseData = req.body;

  try {
    const defense = await GraduationProcessInteractor.createDefense(processId, defenseData);
    sendCreated(res, defense, 'Defense created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateDefenseController = async (req: Request, res: Response) => {
  const processId = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const defense = await GraduationProcessInteractor.updateDefense(processId, updatedData);
    sendSuccess(res, defense, 'Defense updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getDefenseController = async (req: Request, res: Response) => {
  const processId = parseInt(req.params.id);
  const type = req.query.type as string;
  try {
    const defense = await GraduationProcessInteractor.getDefense(processId, type);
    sendSuccess(res, defense, 'Defense retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
