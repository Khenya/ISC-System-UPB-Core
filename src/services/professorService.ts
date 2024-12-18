import createProfessorRequest from '../dtos/createProfessorRequest';
import * as ProfessorRepository from '../repositories/professorRepository'
import * as StudentRepository from '../repositories/studentRepository'
import { buildLogger } from '../plugin/logger';
import { storeProfessor } from '../repositories/professorRepository';
const logger = buildLogger('professorsService');

export const createProfessorService = async (professor: createProfessorRequest): Promise<any | null> => {
  try {
    const professorRequest = {
      id: professor.id,
      degree: professor.degree,
      department: 'DTI',
      specialty: 'Dormir',
    };
    const newProfessor = await storeProfessor(professorRequest);
    return newProfessor;
  } catch (error) {
    console.error('Error in createProfessor interactor:', error);
    return null;
  }
};

export const handleProfessorUpdate = async (userId: string, userProfileData: any) => {
  try {
    await StudentRepository.deleteStudent(userId);
    const existingProfessor = await ProfessorRepository.getProfessorById(userId);
    const professorData = {
      id: userId,
      degree: userProfileData.degree,
      department: userProfileData.department,
      specialty: userProfileData.specialty
    };
    if (existingProfessor) {
      await ProfessorRepository.updateProfessor(userId, professorData);
    } else {
      await ProfessorRepository.storeProfessor(professorData);
    }
  } catch (error) {
    logger.error(`Error updating professor: ${error}`);
    throw error;
  }
};