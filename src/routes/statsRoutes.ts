import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import * as StatsController from '../controllers/statsController';
const router = Router();

router.route('/').get(checkUserAuth, StatsController.getStats);

export default router;
