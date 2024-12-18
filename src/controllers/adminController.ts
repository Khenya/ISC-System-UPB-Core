import { Request, Response } from 'express';
import * as AdminInteractor from '../interactors/adminInteractor';
import createUserRequest from '../dtos/createUserRequest';
import genericUser from '../models/genericUser';
import { sendCreated } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const adminData: createUserRequest = req.body;
    const newAdmin = await AdminInteractor.createAdmin(adminData);
    sendCreated(res, { admin: newAdmin }, 'Admin created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
      const UserData: genericUser = req.body;
      const newUser = await AdminInteractor.createUser(UserData);
      sendCreated(res, { user: newUser }, 'User created successfully');
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error);
      }
    }
}
