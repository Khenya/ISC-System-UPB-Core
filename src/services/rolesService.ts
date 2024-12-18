import Rol from '../models/rol';
import rolePermissionsRequest from '../models/rolePermissionRequestInterface';
import RolePermissionsResponse from '../models/rolePermissionResponseInterface';
import RolesResponse from '../models/rolesResponse';
import * as RolesRepository from '../repositories/rolesRepository';

export const getRoles = async (rolName: string) => {
  try {
    const roles = await RolesRepository.getRoles();
    const response: RolePermissionsResponse = {};
    Object.keys(roles).forEach(roleName => {
      const rolePermissions = roles[roleName];
      if (
        (rolName &&
          roleName.toLowerCase().startsWith(rolName.toLowerCase()) &&
          !rolePermissions.disabled) ||
        (!rolName && !rolePermissions.disabled)
      ) {
        response[roleName] = {
          id: rolePermissions.id,
          disabled: rolePermissions.disabled,
          permissions: rolePermissions.permissions,
        };
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching Roles:', error);
    throw error;
  }
};

export const createRol = async (rol: Rol) => {
  try {
    const similarRoles = await getRoles(rol.name);
    const equalRoles = filterEqualName(similarRoles, rol.name);
    if (Object.keys(equalRoles).length !== 0) {
      throw Error('there is another Rol with the same name');
    }
    const [newRol] = await RolesRepository.createRol(rol);
    return newRol;
  } catch (error) {
    console.error('Error creating Rol:', error);
    throw error;
  }
};

export const editRol = async (rol: Rol, id: number) => {
  try {
    const similarRoles = await getRoles(rol.name);
    const equalRoles = filterEqualName(similarRoles, rol.name);
    if (Object.keys(equalRoles).length !== 0) {
      throw Error('there is another Rol with the same name');
    }
    const editedRol = await RolesRepository.editRol(rol, id);
    return editedRol;
  } catch (error) {
    console.error('Error while editting Rol:', error);
    throw error;
  }
};

export const disableRol = async (id: number) => {
  try {
    const disabledRol = await RolesRepository.disableRol(id);
    return disabledRol;
  } catch (error) {
    console.error('Error while deleting Rol:', error);
    throw error;
  }
};

export const addPermission = async (ides: rolePermissionsRequest) => {
  try {
    const rolePermission = await RolesRepository.addPermission(ides);
    return rolePermission;
  } catch (error) {
    console.error('Error while deleting Rol:', error);
    throw error;
  }
};

export const removePermission = async (ides: rolePermissionsRequest) => {
  try {
    const rolePermission = await RolesRepository.removePermission(ides);
    return rolePermission;
  } catch (error) {
    console.error('Error while deleting Rol:', error);
    throw error;
  }
};

function filterEqualName(roles: RolePermissionsResponse, roleNameToSearch: string) {
  const response: RolePermissionsResponse = {};
  Object.keys(roles).forEach(roleName => {
    const rolePermissions = roles[roleName];
    if (roleName.toLowerCase() === roleNameToSearch.toLowerCase()) {
      response[roleName] = {
        id: rolePermissions.id,
        disabled: rolePermissions.disabled,
        permissions: rolePermissions.permissions,
      };
    }
  });
  return response;
}

const filterAvailableRoles = (roles: RolesResponse[]): RolesResponse[] => {
  return roles.filter(rol => !rol.disabled);
};

export const getRolesProfessor = async () => {
  try {
    const roles = await RolesRepository.getRolesProfessor();
    const response = filterAvailableRoles(roles);
    return response;
  } catch (error) {
    console.error('Error fetching Roles:', error);
    throw error;
  }
};

export const getRolesStudent = async () => {
  try {
    const roles = await RolesRepository.getRolesStudent();
    const response = filterAvailableRoles(roles);
    return response;
  } catch (error) {
    console.error('Error fetching Roles:', error);
    throw error;
  }
};
