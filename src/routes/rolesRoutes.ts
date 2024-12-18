import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import * as RolesController from '../controllers/rolesController';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import RolesByNameSchema from '../middlewares/schemas/searchRolesByNameSchema';
import baseRolSchema from '../middlewares/schemas/BaseRolSchema';
import rolePermissionsSchema from '../middlewares/schemas/rolePermissionSchema';
const router = Router();

router
  .route('/permissions/')
  .post(checkUserAuth, validateBody(rolePermissionsSchema), RolesController.addPermission);
router
  .route('/permissions/')
  .delete(checkUserAuth, validateBody(rolePermissionsSchema), RolesController.removePermission);
router.route('/').get(checkUserAuth, validateBody(RolesByNameSchema), RolesController.getRoles);
router.route('/').post(checkUserAuth, validateBody(baseRolSchema), RolesController.createRol);
router.route('/:id').put(checkUserAuth, validateBody(baseRolSchema), RolesController.editRol);
router.route('/:id').delete(checkUserAuth, RolesController.disableRol);
router.route('/student').get(checkUserAuth, RolesController.getRolesStudent);
router.route('/professor').get(checkUserAuth, RolesController.getRolesProfessor);

export default router;
