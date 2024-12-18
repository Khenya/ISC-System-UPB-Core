import { Router } from 'express';
import UserRole from '../constants/roles';
import * as AdminController from '../controllers/adminController';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { requireRole } from '../middlewares/checkUserRole';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { createAdminSchema } from '../middlewares/schemas/createUserSchema';

const router = Router();

router
  .route('/old')
  .post(
    checkUserAuth,
    requireRole([UserRole.ADMIN.name]),
    validateBody(createAdminSchema),
    AdminController.createAdmin
  );
  router
  .route('/')
  .post(
    checkUserAuth,
    // requireRole([UserRole.ADMIN.name]),
    AdminController.createUser
  );

export default router;
