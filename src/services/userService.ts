import User from '../models/userInterface';
import * as UserRepository from '../repositories/userRepository';
import * as AuthenticationService from './authenticationService';
import { buildLogger } from '../plugin/logger';
import config from '../config/config';
import createUserRequest from '../dtos/createUserRequest';

const logger = buildLogger('userService');
const defaultUserPassword = config.defaultUserPassword;

export const findByEmail = async (email: string): Promise<User> => {
  return UserRepository.getUserByEmail(email);
};

export const createUser = async (user: createUserRequest) => {
  try {
    console.log(user, "yiaaa")
    // TODO: valid the user does not exist with the email or code
    const existingUser = await UserRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const existingUserWithCode = await UserRepository.getStudentByCode(Number(user.code));
    if (existingUserWithCode) {
      throw new Error('User with this code already exists');
    }
    logger.debug('Attempting to create a new User');
    const hashedPassword = await AuthenticationService.hashPassword(defaultUserPassword);
    return await UserRepository.createUser({
      ...user,
      password: hashedPassword,
      username: user.code + user.name + user.lastname,
    });
  } catch (error) {
    console.log('Error creating User');
    throw Error('Error creating User');
  }
};

export const getProfessors = async () => {
  try {
    logger.debug('Attempting to fetch professors');
    const professors = await UserRepository.getProfessors();
    logger.info('Professors fetched successfully.');
    return professors;
  } catch (error) {
    logger.error(`Error fetching professors: ${error}`);
    throw new Error('Error occurred while fetching professors');
  }
};

export const getUserByRol = async (rolId: number) => {
  try {
    return UserRepository.getUserByRol(rolId);
  } catch (error) {
    logger.error(`Error fetching users: ${error}`);
    throw new Error('Error occurred while fetching users');
  }
};

export const getProfessorById = async (id: string) => {
  try {
    logger.debug('Fetching professor by id:', { id });
    const professor = await UserRepository.getProfessorById(id);
    if (!professor) {
      logger.info('No professor found');
      throw new Error('No professor found');
    }
    logger.info('Professor fetched successfully', { professor });
    return professor;
  } catch (error) {
    console.error('Error in getProfessorById interactor:', error);
    throw new Error('Error fetching the professor');
  }
};
