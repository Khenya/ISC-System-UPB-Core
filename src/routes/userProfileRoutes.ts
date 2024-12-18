import { Router } from 'express';
import UserRole from '../constants/roles';
import * as UserProfileController from '../controllers/userProfileController';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { requireRole } from '../middlewares/checkUserRole';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { createAdminSchema } from '../middlewares/schemas/createUserSchema';

const router = Router();

router
    .route('/:id')
    .delete(
        checkUserAuth,
        // TODO: Make it work with requireRole
        // requireRole([UserRole.ADMIN.name]),
        UserProfileController.deleteUser)
router
    .route('/')
    .get(
        checkUserAuth,
        UserProfileController.getAllUsers)
router
    .route('/:id')
    .get(
        checkUserAuth,
        UserProfileController.getUser)
router
    .route('/')
    .post(
        checkUserAuth,
        UserProfileController.createUser)
router
    .route('/:id')
    .put(
        checkUserAuth,
        UserProfileController.updateUser)
export default router;