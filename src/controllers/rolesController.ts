import { Request, Response } from 'express';
import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';
import * as RolesInteractor from '../interactors/rolesInteractor';
import Rol from '../models/rol';
import rolePermissionsRequest from '../models/rolePermissionRequestInterface';

export const getRoles = async (req: Request, res: Response) => {
  const rolName = req.body.name;
  try {
    const roles = await RolesInteractor.getRoles(rolName);
    if (!roles) {
      return res.status(404).json({ success: false, message: 'role not found' });
    }
    sendSuccess(res, roles, 'Roles retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createRol = async (req: Request, res: Response) => {
  const newRol: Rol = req.body;
  try {
    const rol = await RolesInteractor.createRol(newRol);
    if (!rol) {
      return res.status(404).json({ success: false, message: 'can not create role' });
    }
    sendSuccess(res, rol, 'Role created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const editRol = async (req: Request, res: Response) => {
  const rolToEdit: Rol = req.body;
  const id: number = parseInt(req.params.id);
  try {
    const editedRol = await RolesInteractor.editRol(rolToEdit, id);
    if (!editedRol) {
      return res.status(404).json({ success: false, message: 'can not edit rol' });
    }
    sendSuccess(res, editedRol, 'Role edited successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const disableRol = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const disabledRol = await RolesInteractor.disableRol(id);
    if (!disabledRol) {
      return res.status(404).json({ success: false, message: 'can not delet rol' });
    }
    sendSuccess(res, disabledRol, 'Role deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const addPermission = async (req: Request, res: Response) => {
  const ides: rolePermissionsRequest = req.body;
  try {
    const rolePermission = await RolesInteractor.addPermission(ides);
    if (!rolePermission) {
      return res.status(404).json({ success: false, message: 'can not delet rol' });
    }
    sendSuccess(res, rolePermission, 'permission attach successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const removePermission = async (req: Request, res: Response) => {
  const ides: rolePermissionsRequest = req.body;
  try {
    const rolePermission = await RolesInteractor.removePermission(ides);
    if (!rolePermission) {
      return res.status(404).json({ success: false, message: 'can not delet rol' });
    }
    sendSuccess(res, rolePermission, 'permission attach successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getRolesStudent = async (req: Request, res: Response) => {
  try {
    const rolesStudent = await RolesInteractor.getRolesStudent();
    sendSuccess(res, rolesStudent, 'Roles student retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getRolesProfessor = async (req: Request, res: Response) => {
  try {
    const rolesProfessor = await RolesInteractor.getRolesProfessor();
    sendSuccess(res, rolesProfessor, 'Roles professor retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
