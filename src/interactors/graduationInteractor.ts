import createGraduationProcessRequest from '../dtos/createGraduationProcessRequest';
import NewGraduationProcess from '../dtos/newGraduationProcess';
import { BadRequestError } from '../errors/badRequestError';
import { NotFoundError } from '../errors/notFoundError';
import { DefenseDetail } from '../models/defenseDetailInterface';
import GraduationProcess from '../models/graduationProcessInterface';
import * as GraduationProcessService from '../services/graduationService';
import { getStudentByCode } from './studentInteractor';

export const getGraduationProcessById = async (processId: number) => {
  const process = await GraduationProcessService.getGraduationProcessById(processId);

  if (!process) {
    throw new NotFoundError('There is no process');
  }

  return process;
};

export const updateGraduationProcess = async (
  processId: number,
  updatedData: Partial<GraduationProcess>
) => {
  try {
    const updatedGraduationProcess = await GraduationProcessService.updateGraduationProcess(
      processId,
      updatedData
    );
    return updatedGraduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessService.updateGraduationProcess:', error);
    throw new Error('Error updating Graduation Process');
  }
};

export const createGraduationProcess = async (
  graduationProcess: createGraduationProcessRequest
) => {
  const student = await getStudentByCode(graduationProcess.student_code);
  if (!student) {
    throw new BadRequestError("The provided student doesn't exist");
  }

  const newGraduationProcess: NewGraduationProcess = {
    modality_id: graduationProcess.modality_id,
    period: graduationProcess.period,
    project_name: graduationProcess.project_name,
    student_id: student.id,
  };
  return await GraduationProcessService.createGraduationProcess(newGraduationProcess);
};

export const getGraduationProcesses = async () => {
  const graduationProcesses = await GraduationProcessService.getGraduationProcesses();
  if (!graduationProcesses) {
    throw new NotFoundError('No graduation processes found');
  }
  return graduationProcesses;
};

export const createDefense = async (processId: number, defenseData: DefenseDetail) => {
  return await GraduationProcessService.createDefense(processId, defenseData);
};

export const updateDefense = async (processId: number, updatedData: Partial<DefenseDetail>) => {
  return await GraduationProcessService.updateDefense(processId, updatedData);
};

export const getDefense = async (processId: number, type: string) => {
  return await GraduationProcessService.getDefense(processId, type);
};
