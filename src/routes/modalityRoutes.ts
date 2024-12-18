import { Router } from 'express';
import * as ModalityController from '../controllers/modalityController';
import { checkUserAuth } from '../middlewares/checkUserAuth';

const router = Router();

router.route('/').get(checkUserAuth, ModalityController.getModalitiesController);

export default router;
