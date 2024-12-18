import Permission from "../models/permissionInterface";
import * as permissionRepository from "../repositories/permissionRepository";

export const getUserRolesAndPermissions = async (id: number):Promise<Permission | null> => {
  const rolesAndPermissions = await permissionRepository.getRoleAndPermissions(id);
  if (!rolesAndPermissions || Object.keys(rolesAndPermissions).length === 0) {
    return null; 
  }
  return rolesAndPermissions;
};

export const getPermissions = async () => {
  const permissions = await permissionRepository.getPermissions();
  return permissions;
};

export const getPermissionByID = async (id: number) => {
  const permission = await permissionRepository.getPermissionByID(id);
  return permission;
};
