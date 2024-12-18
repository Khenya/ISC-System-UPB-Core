import { Request, Response } from 'express';
import * as permissionInteractor from '../interactors/permissionsInteractor';
import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';

export const getUserRolesAndPermissions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rolesAndPermissions = await permissionInteractor.getRolesAndPermissions(parseInt(id));
    sendSuccess(res, rolesAndPermissions, 'Roles and permissions retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await permissionInteractor.getPermissions();
    if (!permissions) {
      return res.status(404).json({ success: false, message: 'permissions not found' });
    }
    sendSuccess(res, permissions, 'Permissions retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getPermissionByID = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const permission = await permissionInteractor.getPermissionByID(id);
    if (!permission) {
      return res.status(404).json({ success: false, message: 'permission not found' });
    }
    sendSuccess(res, permission, 'Permissio retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
