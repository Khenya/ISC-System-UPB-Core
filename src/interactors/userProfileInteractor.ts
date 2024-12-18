import * as UserProfileService from '../services/userProfileService';
import * as UserRoleService from '../services/userRoleService';
import * as ProfessorService from '../services/professorService'
import * as StudentService from '../services/studentService'
import { NotFoundError } from "../errors/notFoundError";

export const deleteUser = async (userId: string) => {
  try {
    const user = await UserProfileService.getUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await UserProfileService.deleteUser(parseInt(userId));
    await UserRoleService.deleteUserRole(userId);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error((error as Error).message);
  }
};

export const getAllUsers = async () => {
  try {
    return await UserProfileService.getAllUsers();
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new Error((error as Error).message);
  }
};

export const getUser = async (userId: string) => {
  try {
    return await UserProfileService.getUser(userId);
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error((error as Error).message);
  }
};

export const createUser = async (userData: any) => {
  try {
    const newUser = await UserProfileService.createUserProfile(userData);
    if (!newUser) {
      throw new Error('Error creating user');
    }
    const { id } = newUser;
    const { isStudent ,roles } = userData;
    const userRole = await UserRoleService.createUserRoles(id, roles);
    if (!userRole) {
      throw new Error('Error creating the user roles');
    }
    const combinedData = { ...userData, id };

    if(isStudent){
     await StudentService.createStudent(combinedData)
    }else{ await ProfessorService.createProfessorService(combinedData); }

    return newUser;
  } catch (error) {
    console.error('Error in create user interactor:', error);
    throw new Error('Error creating user');
  }
};

export const updateUser = async (userId: string, userProfileData:any) => {
  try {
    const updatedUserProfile = await UserProfileService.updateUserProfile(userId, userProfileData);
    if (userProfileData.isStudent) {
      await StudentService.handleStudentUpdate(userId, userProfileData);
    } else {
      await ProfessorService.handleProfessorUpdate(userId, userProfileData);
    }
    await UserProfileService.updateUserRoles(userId, userProfileData.roles);
    return updatedUserProfile;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error((error as Error).message);
  }
};
