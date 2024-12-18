import * as UserService from '../services/userService';
import * as UserRoleService from '../services/userRoleService';
import { createUserService } from '../services/adminService';
import createUserRequest from '../dtos/createUserRequest';
import genericUser from '../models/genericUser';

const adminRole = 3;

export const createAdmin = async (studentData: createUserRequest) => {
  try {
    const newStudent = await UserService.createUser(studentData);

    if (!newStudent) {
      throw new Error('Error creating the admin');
    }

    const { id } = newStudent;
    const userRole = await UserRoleService.createUserRole(id, adminRole);
    if (!userRole) {
      throw new Error('Error creating the admin Role');
    }
    return newStudent;
  } catch (error) {
    console.error('Error in createAdmin interactor:', error);
    throw new Error('Error creating the admin');
  }
};
export const createUser = async (userData: genericUser) =>{
  try {
      const newUser = await createUserService(userData);
  
      if (!newUser) {
        throw new Error('Error creating the User');
      }
      return newUser;
    } catch (error) {
      console.error('Error in createUser interactor:', error);
      throw new Error('Error creating the user');
    }

}
