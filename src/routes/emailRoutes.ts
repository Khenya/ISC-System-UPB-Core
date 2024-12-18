import { Router } from 'express';

import { checkUserAuth } from '../middlewares/checkUserAuth';
import * as EmailController from '../controllers/emailController';

const router = Router();

router.route('/').post(checkUserAuth, EmailController.sendEmail);

export default router;
