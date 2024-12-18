import express from 'express';
import * as ProfessorController from '../controllers/professorController';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { professorSchema } from '../middlewares/schemas/createProfessorSchema';
const router = express.Router();

router.get('/', checkUserAuth, ProfessorController.getProfessorsController);
router.post('/', checkUserAuth, validateBody(professorSchema), ProfessorController.createProfessor);
router.get('/:id', checkUserAuth, ProfessorController.getProfessorById);

export default router;
