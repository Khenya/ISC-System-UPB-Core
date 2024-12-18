import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import * as userController from '../controllers/permissionController';
const router = Router();

router
    .route('/user/:id')
    .get(checkUserAuth, userController.getUserRolesAndPermissions);
router.route('/').get(checkUserAuth, userController.getPermissions);
router.route('/:id').get(checkUserAuth, userController.getPermissionByID)

export default router;
