import * as userService from '../services/permissionService';
import { NotFoundError } from '../errors/notFoundError';

export const getRolesAndPermissions = async (userId: number) => {
    try {
      const rolesAndPermissions = await userService.getUserRolesAndPermissions(userId);
  
      if (!rolesAndPermissions|| Object.keys(rolesAndPermissions).length === 0) {
        return [];
      }
      return rolesAndPermissions;
    } catch (error) {
      console.error('Error getting permissions:', error);
      throw new Error('Error getting permissions');
    }
  };

export const getPermissions = async () => {
  try {
    const Permissions = await userService.getPermissions();
    return Permissions;
  } catch (error) {
    console.error('Error getting permissions:', error);
    throw error;
  }
};

export const getPermissionByID = async (id:number) => {
  try {
    const Permission = await userService.getPermissionByID(id);
    if (!Permission|| Object.keys(Permission).length === 0) {
      throw new NotFoundError('Permission not found');
    }
    return Permission;
  } catch (error) {
    console.error('Error getting permissions:', error);
    throw error;
  }
};
