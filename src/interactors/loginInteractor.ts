import * as UserService from '../services/userService';
import * as AuthenticationService from '../services/authenticationService';
import { generateToken } from '../utils/jwtUtility';
import { buildLogger } from '../plugin/logger';
import UserResponse from '../models/userResponseInterface';
import { AuthenticationError } from '../errors/authenticationError';

const logger = buildLogger('loginController');

export const login = async (email: string, password: string): Promise<UserResponse | string> => {
  logger.debug(`Attempting login for email: ${email}`);
  logger.info(`Login attempt for email: ${email}`);

  const user = await UserService.findByEmail(email);
  if (!user) {
    logger.warn(`Login failed: User not found for email: ${email}`);
    throw new AuthenticationError('Invalid username or password');
  }

  const { id, roles } = user;
  if (!id) {
    logger.warn(`Login failed: User not have id: ${email}`);
    throw new AuthenticationError('Invalid username or password');
  }
  const token = generateToken(id, roles);
  logger.debug(`Token generated for user ID: ${user.id}`);

  const isValidPassword = await AuthenticationService.verifyPassword(password, user.password);

  if (isValidPassword) {
    const userResponse = {
      ...user,
      token,
    } as UserResponse;

    delete userResponse.password;

    logger.info(`Login successful for email: ${email}`);
    logger.debug(`User details: ${JSON.stringify(userResponse)}`);
    return userResponse;
  } else {
    logger.warn(`Login failed: Invalid password for email: ${email}`);
    throw new AuthenticationError('Invalid username or password');
  }
};
