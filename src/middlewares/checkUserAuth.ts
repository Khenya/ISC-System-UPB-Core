import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtility';

export const checkUserAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.userId = decoded.id;
  req.userRoles = decoded.roles as string[];

  next();
};
