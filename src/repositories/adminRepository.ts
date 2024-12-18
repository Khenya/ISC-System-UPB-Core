import User from '../models/genericUserResponse';
import db from './pg-connection';

const userProfileTable = 'user_profile'

export const createUser = async (userData: User) => {
    try {
      const [newUser] = await db(userProfileTable).insert(userData).returning('*');
      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };