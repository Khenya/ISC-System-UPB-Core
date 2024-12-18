import { Request, Response } from 'express';
import * as StudentInteractor from '../interactors/studentInteractor';
import createUserRequest from '../dtos/createUserRequest';
import { handleError } from '../handlers/errorHandler';
import { sendCreated, sendSuccess } from '../handlers/successHandler';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentInteractor.getStudents();
    sendSuccess(res, students, 'Students retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData: createUserRequest = req.body;
    const newStudent = await StudentInteractor.createStudent(studentData);
    sendCreated(res, newStudent, 'Student created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getStudentByCode = async (req: Request, res: Response) => {
  const userCode = parseInt(req.params.code);

  try {
    const student = await StudentInteractor.getStudentByCode(userCode);
    sendSuccess(res, student, 'Student retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    await StudentInteractor.deleteStudent(userId);
    sendSuccess(res, null, 'Student deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getStudent = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const student = await StudentInteractor.getStudent(userId);
    sendSuccess(res, student, 'Student retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const studentData: createUserRequest = req.body;

  try {
    const student = await StudentInteractor.updateStudent(userId, studentData);
    sendSuccess(res, student, 'Student updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
