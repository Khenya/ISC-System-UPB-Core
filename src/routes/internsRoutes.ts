import { Router } from "express";
import { updateHoursController, getInternsById,getRecordInternsController, getInformationsInternController, getMyEventsInternController } from "../controllers/internController";

const router = Router();

router.route('/:intern_id/update-hours').put(updateHoursController);
router.route('/:intern_id').get(getInternsById);
router.route('/:intern_id/historial-eventos').get(getRecordInternsController);
router.route('/:intern_id/my-events').get(getMyEventsInternController);
router.route('/:intern_id/informacion').get(getInformationsInternController)

export default router;