import * as UserRolesRepository from '../repositories/userRolesRepository';
import { buildLogger } from '../plugin/logger';

const logger = buildLogger('userRoleService');

export const createUserRole = async (userId: string, studentRole: number) => {
  try {
    return UserRolesRepository.assignUserRole(userId, studentRole);
  } catch (error) {
    console.log('Error creating User');
    throw Error('Error creating User');
  }
};

export const createUserRoles = async (userId: string, roles: number[]) => {
  try {
    const results = await Promise.all(
      roles.map(roleId => UserRolesRepository.assignUserRole(userId, roleId))
    );
    return results.length > 0;
  } catch (error) {
    console.log('Error creating User Roles');
    throw Error('Error creating User Roles');
  }
};

export const deleteUserRole = async (userId: string) => {
  try {
    logger.debug(`Attempting to delete user role with user id: ${userId}`);
    await UserRolesRepository.deleteUserRole(userId);
    logger.info('User role deleted successfully.');
  } catch (error) {
    logger.error(`Error deleting user role: ${error}`);
    throw new Error('Error deleting user role');
  }
};
