import { Request, Response } from 'express';
import * as userProfileInteractor from '../interactors/userProfileInteractor'
import { sendCreated } from '../handlers/successHandler';
import { sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';
import createUserRequest from '../dtos/createUserRequest';

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    await userProfileInteractor.deleteUser(userId);
    sendSuccess(res, null, 'User deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userProfileInteractor.getAllUsers();
    sendSuccess(res, users, 'All users were obtained successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userProfileInteractor.getUser(id);
    sendSuccess(res, user, 'User was obtained successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: createUserRequest = req.body;
    const newUser = await userProfileInteractor.createUser(userData);
    sendCreated(res, newUser, 'User created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userProfileData: createUserRequest = req.body;
    const user = await userProfileInteractor.updateUser(id, userProfileData);
    sendSuccess(res, user, 'User was updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};