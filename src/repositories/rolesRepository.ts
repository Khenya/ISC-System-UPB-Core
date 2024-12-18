import Rol from '../models/rol';
import RolePermissions from '../models/rolePermissionInterface';
import rolePermissionsRequest from '../models/rolePermissionRequestInterface';
import RolePermissionsResponse from '../models/rolePermissionResponseInterface';
import db from './pg-connection';

const rolesTable = 'roles';
const rolePermissionsTable = 'role_permissions';
const permissionsTable = 'permissions';

export const getRoles = async () => {
  try {
    const roles = await db
      .select(`${rolesTable}.*`, `${permissionsTable}.name as permission_name`)
      .from(rolesTable)
      .leftJoin(rolePermissionsTable, `${rolesTable}.id`, `${rolePermissionsTable}.role_id`)
      .leftJoin(permissionsTable, `${rolePermissionsTable}.permission_id`, `${permissionsTable}.id`)
      .orderBy('created_at', 'asc');

    const response: RolePermissionsResponse = {};
    roles.forEach((rol: RolePermissions) => {
      if (!response[rol.name]) {
        response[rol.name] = { id: rol.id, disabled: rol.disabled, permissions: [] };
      }
      if (rol.permission_name) {
        response[rol.name].permissions.push(rol.permission_name);
      }
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRol = async (rolData: Rol) => {
  try {
    const newRol = await db(rolesTable).insert(rolData).returning('*');
    return newRol;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editRol = async (rolData: Rol, id: number) => {
  try {
    const editedRol = await db(rolesTable).where('id', id).update(rolData).returning('*');
    return editedRol;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const disableRol = async (id: number) => {
  try {
    const editedRol = await db(rolesTable).where('id', id).update('disabled', true).returning('*');
    return editedRol;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPermission = async (ides: rolePermissionsRequest) => {
  try {
    await db(rolePermissionsTable)
      .where('role_id', ides.role_id)
      .where('permission_id', ides.permission_id)
      .delete();
    const rolePermission = await db(rolePermissionsTable).insert(ides).returning('*');
    return rolePermission;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removePermission = async (ides: rolePermissionsRequest) => {
  try {
    const rolePermission = await db(rolePermissionsTable)
      .where('role_id', ides.role_id)
      .where('permission_id', ides.permission_id)
      .delete()
      .returning('*');
    return rolePermission;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRolesProfessor = async () => {
  try {
    const rolesProfessor = await db(rolesTable).where('category', 'professor').returning('*');
    return rolesProfessor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRolesStudent = async () => {
  try {
    const rolesStudent = await db(rolesTable).where('category', 'student').returning('*');
    return rolesStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
