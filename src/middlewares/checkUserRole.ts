import { Request, Response, NextFunction } from 'express';

export const requireRole = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRoles) {
      return res.status(401).json({ message: 'Role data missing, authorization failed' });
    }

    const hasRequiredRole = requiredRoles.some(role => req.userRoles!.includes(role));

    if (!hasRequiredRole) {
      return res.status(403).json({ message: 'Insufficient permissions, access denied' });
    }

    next();
  };
};
