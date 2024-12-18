import NewGraduationProcess from '../dtos/newGraduationProcess';
import { DefenseDetail } from '../models/defenseDetailInterface';
import GraduationProcess from '../models/graduationProcessInterface';
import * as GraduationProcessRepository from '../repositories/graduationRepository';

export const getGraduationProcessById = async (processId: number): Promise<GraduationProcess> => {
  return GraduationProcessRepository.getGraduationProcessById(processId);
};

export const updateGraduationProcess = async (
  id: number,
  updatedData: Partial<GraduationProcess>
): Promise<GraduationProcess> => {
  return GraduationProcessRepository.updateGraduationProcess(id, updatedData);
};

export const createGraduationProcess = async (graduationProcess: NewGraduationProcess) => {
  const newGraduationProcess = {
    ...graduationProcess,
    seminar_enrollment: false,
    tutor_letter: false,
    tutor_approval: false,
    reviewer_letter: false,
    reviewer_approval: false,
    stage_id: 1,
  };
  console.log(newGraduationProcess);

  return GraduationProcessRepository.createGraduationProcess(newGraduationProcess);
};

export const getGraduationProcesses = async (): Promise<GraduationProcess[]> => {
  return GraduationProcessRepository.getGraduationProcesses();
};

export const createDefense = async (processId: number, defenseData: DefenseDetail) => {
  return GraduationProcessRepository.createDefense(processId, defenseData);
};

export const updateDefense = async (defenseId: number, updatedData: Partial<DefenseDetail>) => {
  return GraduationProcessRepository.updateDefense(defenseId, updatedData);
};

export const getDefense = async (processId: number, type: string) => {
  return GraduationProcessRepository.getDefense(processId, type);
};
