import { Router } from 'express';
import * as GraduationController from '../controllers/graduationController';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { validateParams } from '../middlewares/validateParamsMiddleware';
import { paramIdSchema } from '../middlewares/schemas/paramIdSchema';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { createGraduationProcessSchema } from '../middlewares/schemas/createGraduationProcessSchema';
import { updateGraduationProcessSchema } from '../middlewares/schemas/updateGraduationProcessSchema';

const router = Router();

router
  .route('/:id')
  .get(
    checkUserAuth,
    validateParams(paramIdSchema),
    GraduationController.getGraduationProcessByIdController
  );
router
  .route('/:id')
  .put(
    checkUserAuth,
    validateParams(paramIdSchema),
    validateBody(updateGraduationProcessSchema),
    GraduationController.updateGraduationProcessController
  );
router
  .route('/')
  .post(
    checkUserAuth,
    validateBody(createGraduationProcessSchema),
    GraduationController.createGraduationProcessController
  );
router.route('/').get(checkUserAuth, GraduationController.getGraduationProcessesController);

router.route('/:id/defense').post(checkUserAuth, GraduationController.createDefenseController);

router.route('/:id/defense').put(checkUserAuth, GraduationController.updateDefenseController);

router.route('/:id/defense').get(checkUserAuth, GraduationController.getDefenseController);

export default router;
