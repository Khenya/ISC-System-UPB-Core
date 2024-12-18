import { Router } from 'express';
import * as StudentController from '../controllers/studentController';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { createStudentSchema } from '../middlewares/schemas/createUserSchema';
import { validateParams } from '../middlewares/validateParamsMiddleware';
import { studentCodeSchema } from '../middlewares/schemas/studenCodeSchema';

const router = Router();

router.route('/').get(checkUserAuth, StudentController.getStudents);
router
  .route('/')
  .post(checkUserAuth, validateBody(createStudentSchema), StudentController.createStudent);
router
  .route('/by-code/:code')
  .get(checkUserAuth, validateParams(studentCodeSchema), StudentController.getStudentByCode);

router.route('/:id').delete(checkUserAuth, StudentController.deleteStudent);

router.route('/:id').get(checkUserAuth, StudentController.getStudent);

router.route('/:id').put(checkUserAuth, StudentController.updateStudent);

export default router;
