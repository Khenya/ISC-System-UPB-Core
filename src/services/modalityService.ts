import Modality from '../models/modalityInterface';
import * as ModalityRepository from '../repositories/modalityRepository';

export const getGraduationProcessById = async (): Promise<Modality[]> => {
  return ModalityRepository.getModalities();
};
