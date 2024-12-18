import { Router } from 'express';
import {
  getEventsController,
  getEventsByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} from '../controllers/eventsController';

const router = Router();

router.route('/').get(getEventsController);
router.route('/:id').get(getEventsByIdController);
router.route('/').post(createEventController);
router.route('/:id').put(updateEventController);
router.route('/:id').delete(deleteEventController);

export default router;
