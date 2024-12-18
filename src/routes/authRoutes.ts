import { Router } from 'express';
import login from '../controllers/authController';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { loginSchema } from '../middlewares/schemas/loginSchema';

const router = Router();

router.route('/login').post(validateBody(loginSchema), login);

export default router;
