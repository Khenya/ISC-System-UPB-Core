import { DefenseDetail } from '../models/defenseDetailInterface';
import GraduationProcess from '../models/graduationProcessInterface';
import db from './pg-connection';

const tableName = 'graduation_process';

export const getGraduationProcessById = async (id: number) => {
  try {
    const graduationProcess = await db(`${tableName} as gp`)
      .join('users as student', 'gp.student_id', 'student.id')
      .leftJoin('users as tutor', 'gp.tutor_id', 'tutor.id')
      .leftJoin('users as reviewer', 'gp.reviewer_id', 'reviewer.id')
      .join('modalities', 'gp.modality_id', 'modalities.id')
      .select(
        db.raw(
          "CONCAT(student.name, ' ', student.lastname, ' ', student.mothername) as student_fullname"
        ),
        db.raw("CONCAT(tutor.name, ' ', tutor.lastname, ' ', tutor.mothername) as tutor_fullname"),
        db.raw(
          "CONCAT(reviewer.name, ' ', reviewer.lastname, ' ', reviewer.mothername) as reviewer_fullname"
        ),
        'student.name as student_name',
        'tutor.name as tutor_name',
        'tutor.degree as tutor_degree',
        'reviewer.name as reviewer_name',
        'reviewer.degree as reviewer_degree',
        'modalities.name as modality_name',
        'gp.*'
      )
      .where('gp.id', id)
      .first();
    return graduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.getGraduationProcessById:', error);
    throw new Error('Error fetching Graduation Process');
  }
};

export const updateGraduationProcess = async (
  id: number,
  updatedData: Partial<GraduationProcess>
) => {
  try {
    const updatedRows = await db(tableName).where({ id }).update(updatedData);
    if (updatedRows === 0) {
      throw new Error('Graduation process not found or no change made');
    }
    return await db(tableName).where({ id }).first();
  } catch (error) {
    console.error('Error in GraduationProcessRepository.updateGraduationProcess:', error);
    throw new Error('Error updating Graduation Process');
  }
};

export const createGraduationProcess = async (data: GraduationProcess) => {
  try {
    const [newGraduationProcess] = await db(tableName).insert(data).returning('*');
    return newGraduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.createGraduationProcess:', error);
    throw new Error('Error creating Graduation Process');
  }
};

export const getGraduationProcesses = async () => {
  try {
    const students = await db('graduation_process as gp')
      .select(
        'u.name as student_name',
        'm.name as modality',
        'tutor.name as tutor_name',
        'reviewer.name as reviewer_name',
        'gp.period as period',
        'gp.id'
      )
      .join('users as u', 'u.id', '=', 'gp.student_id')
      .join('modalities as m', 'm.id', '=', 'gp.modality_id')
      .leftJoin('users as tutor', 'tutor.id', '=', 'gp.tutor_id')
      .leftJoin('users as reviewer', 'reviewer.id', '=', 'gp.reviewer_id');
    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDefense = async (processId: number, defenseData: DefenseDetail) => {
  try {
    const defense = await db('defense_details as dd')
      .insert({ ...defenseData, graduation_process_id: processId })
      .returning('*');
    return defense;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.createDefense:', error);
    throw new Error('Error creating defense');
  }
};

export const updateDefense = async (defenseId: number, updatedData: Partial<DefenseDetail>) => {
  try {
    const updatedRows = await db('defense_details').where({ id: defenseId }).update(updatedData);
    if (updatedRows === 0) {
      throw new Error('Defense not found or no change made');
    }
    return await db('defenseDetail').where({ id: defenseId }).first();
  } catch (error) {
    console.error('Error in GraduationProcessRepository.updateDefense:', error);
    throw new Error('Error updating defense');
  }
};

export const getDefense = async (processId: number, type: string) => {
  try {
    const defense = await db('defense_details')
      .where({ graduation_process_id: processId, type: type })
      .first();
    return defense;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.getDefense:', error);
    throw new Error('Error fetching defense');
  }
};
