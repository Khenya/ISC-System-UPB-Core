import { buildLogger } from '../plugin/logger';
import db from './pg-connection';

const logger = buildLogger('studentRepository');

const TABLE_NAME = 'students';
interface studentInterface {
  id: string;
  is_scholarship:boolean;
}
export const storeStudent = async (student: studentInterface) => {
  try {
    const newStudent = await db(TABLE_NAME).insert(student).returning('*');
    if (!newStudent) {
      logger.debug('Student have not created');
    }
    return newStudent;
  } catch (error) {
    logger.error(`Error creating student: ${error}`);
    throw error;
  }
};
export const getStudentById = async (userId: string) => {
  try {
    const student = await db(TABLE_NAME).where('id', userId).first();
    return student;
  } catch (error) {
    logger.error(`Error fetching student by id: ${error}`);
    throw error;
  }
};
export const updateStudent = async (userId: string, studentData: any) => {
  try {
    const updatedStudent = await db(TABLE_NAME)
      .where('id', userId)
      .update(studentData)
      .returning('*');
    return updatedStudent;
  } catch (error) {
    logger.error(`Error updating student: ${error}`);
    throw error;
  }
};
export const deleteStudent = async (userId: string) => {
  try {
    await db(TABLE_NAME).where('id', userId).delete();
  } catch (error) {
    logger.error(`Error deleting student: ${error}`);
    throw error;
  }
};
