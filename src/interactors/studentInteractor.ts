import * as StudentService from '../services/studentService';
import * as UserService from '../services/userService';
import * as UserProfileService from '../services/userProfileService'
import * as UserRoleService from '../services/userRoleService';
import createUserRequest from '../dtos/createUserRequest';
import { NotFoundError } from '../errors/notFoundError';

const studentRole = 1;

export const getStudents = async () => {
  const students = await StudentService.getStudents();

  if (!students) {
    throw new NotFoundError('There are no students');
  }

  return students;
};

export const getStudentByCode = async (studentCode: number) => {
  const student = await StudentService.getStudentByCode(studentCode);

  if (!student) {
    throw new NotFoundError('There is not student with the provide code');
  }
  return student;
};

export const createStudent = async (studentData: createUserRequest) => {
  try {


    const existingUser = await StudentService.getStudentByEmail(studentData.email);
    if (existingUser) {
      throw new Error('Estudiante con este email ya existe.');
    }

    const existingUserWithCode = await StudentService.getStudentByCode(Number(studentData.code));
    if (existingUserWithCode) {
      throw new Error('Estudiante con este código ya existe.');
    }

    const newStudent = await UserService.createUser(studentData);

    if (!newStudent) {
      throw new Error('Error creating the student');
    }

    const { id } = newStudent;
    const userRole = await UserRoleService.createUserRole(id, studentRole);
    if (!userRole) {
      throw new Error('Error creating the student Role');
    }
    return newStudent;
  } catch (error) {
    console.error('Error in createStudent interactor:', error);
    throw new Error((error as Error).message);
  }
};

export const deleteStudent = async (studentId: number) => {
  try {
    const student = await StudentService.getStudentById(studentId);

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    await UserProfileService.deleteUser(studentId);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error((error as Error).message);
  }
};

export const getStudent = async (studentId: number) => {
  try {
    const student = await StudentService.getStudentById(studentId);

    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return student;
  } catch (error) {
    console.error('Error getting student:', error);
    throw new Error('Error getting student');
  }
};

export const updateStudent = async (studentId: number, studentData: createUserRequest) => {
  try {
    const student = await StudentService.getStudentById(studentId);

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const updatedStudent = await StudentService.updateUser(studentId, studentData);
    return updatedStudent;
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Error updating student');
  }
};
