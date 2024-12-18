import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import {
  deleteRegistrationController,
  getEventInternsController,
  registerInternController,
  updateInternType,
  updateEventHistoryController,
  updateAttendanceController,
  getEventInformationsController,
} from '../controllers/eventInternsController';

const router = Router();

router.route('/:id_evento/register').post(registerInternController);
router.route('/:id_evento/registrations').get(getEventInternsController);
router.route('/:id_evento/update-status/:id_becario').put(updateInternType);
router.route('/:id_evento/registrations/:id_becario').delete(deleteRegistrationController);
router.route('/:id_evento/actualizar-eventos').put(updateEventHistoryController);
router.route('/:id_evento/confirm_attendance/:id_becario').put(updateAttendanceController);
router.route('/register-information').get(getEventInformationsController);

export default router;
