import genericUser from "../models/genericUser"
import * as UserRepository from '../repositories/userRepository';
import { createUser } from '../repositories/adminRepository'
import * as AuthenticationService from './authenticationService';
import { buildLogger } from '../plugin/logger';
import config from '../config/config';

const logger = buildLogger('userService');
const defaultUserPassword = config.defaultUserPassword;

export const createUserService = async (user: genericUser) => {
  try {
    const existingUser = await UserRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    logger.debug('Attempting to create a new User');
    const hashedPassword = await AuthenticationService.hashPassword(defaultUserPassword);
    return await createUser({
      ...user,
      password: hashedPassword,
      username: user.name + user.lastname,
    })
  } catch (error) {
    console.log('Error creating User');
    throw Error('Error creating User');
  }
}