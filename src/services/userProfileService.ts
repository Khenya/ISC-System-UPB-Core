import createProfessorRequest from '../dtos/createProfessorRequest';
import * as UserProfileRepository from '../repositories/userProfileRepository';
import * as UserRoleRepository from '../repositories/userRolesRepository'
import * as PermissionInteractor from '../interactors/permissionsInteractor'
import UserRole from '../constants/roles';
import UserResponse from '../models/genericUserResponse';
import { buildLogger } from '../plugin/logger';
import { NotFoundError } from '../errors/notFoundError';
const logger = buildLogger('userProfileService');

export const createUserProfile = async (createUserProfileRequest: createProfessorRequest) => {
  try {
    logger.info('Creating user profile with data:', { createUserProfileRequest });
    const userProfile = {
      name: createUserProfileRequest.name,
      lastname: createUserProfileRequest.lastname,
      username: createUserProfileRequest.lastname + createUserProfileRequest.name,
      email: createUserProfileRequest.email,
      password: 'createpassworddefect',
      mothername: createUserProfileRequest.mothername,
      phone: createUserProfileRequest.phone,
      role_id: createUserProfileRequest.isStudent ? UserRole.STUDENT.id : UserRole.PROFESSOR.id,
      code: createUserProfileRequest.code,
    };
    const newUserProfile = await UserProfileRepository.createUserProfile(userProfile);
    return newUserProfile;
  } catch (error) {
    console.error('Error in createUserProfileService:', error);
    return null;
  }
};


export const deleteUser = async (userId: number) => {
  try {
    logger.debug(`Attempting to delete user with id: ${userId}`);
    await UserProfileRepository.deleteUser(userId);
    logger.info('User deleted successfully.');
  } catch (error) {
    logger.error(`Error deleting user: ${error}`);
    throw new Error('Error deleting user');
  }
};

export const getUserById = async (userId: string): Promise<UserResponse | null> => {
  return UserProfileRepository.getUserById(parseInt(userId));
};

export const getAllUsers = async (): Promise<UserResponse[] | null> => {
  try {
    const users = await UserProfileRepository.getAllUsers();
    if (!users) { throw new NotFoundError('Users not found') }

    const usersWithRolesAndPermissions = await Promise.all(
      users.map(async (user: any) => {
        try {
          const rolesAndPermissions = await PermissionInteractor.getRolesAndPermissions(user.id);
          return {
            ...user,
            rolesAndPermissions,
          };
        } catch (error) {
          console.error(`Error getting roles and permissions for user ${user.id}:`, error);
          return {
            ...user,
            rolesAndPermissions: null,
          };
        }
      })
    );
    return usersWithRolesAndPermissions;
  } catch (error) {
    logger.error(`Error getting users: ${error}`);
    throw new Error('Error getting users');
  }
};

export const getUser = async (userId: string): Promise<UserResponse | null> => {
  const user = await UserProfileRepository.getUserById(parseInt(userId));
  if (!user) { throw new NotFoundError(`User not found with such id ${userId}`) }
  const rolesAndPermissions = await PermissionInteractor.getRolesAndPermissions(parseInt(userId));
  return {
    ...user,
    rolesAndPermissions
  }

}

export const updateUserProfile = async (userId: string, userProfileData: any) => {
  try {
    const userProfileRequest = {
      name: userProfileData.name,
      lastname: userProfileData.lastname,
      mothername: userProfileData.mothername,
      code: userProfileData.code,
      email: userProfileData.email,
      phone: userProfileData.phone
    }
    const updatedProfile = await UserProfileRepository.updateUserProfile(userId, userProfileRequest);
    return updatedProfile;
  } catch (error) {
    logger.error(`Error updating user: ${error}`);
    throw error;
  }
};

export const updateUserRoles = async (userId: string, roles: number[]) => {
  try {
    await UserRoleRepository.deleteUserRole(userId);
    const primaryRole = roles[0];
    await UserProfileRepository.updateUserProfileRole(userId, primaryRole);

    const remainingRoles = roles.slice(1);
    for (const roleId of remainingRoles) {
      await UserRoleRepository.assignUserRole(userId, roleId);
    }
  } catch (error) {
    logger.error(`Error updating user role: ${error}`);
    throw error;
  }
};