import { Request, Response } from 'express';
import {
  getEventIntern,
  registerIntern,
  updateInternsType,
  cancelInternRegistration,
  updateEventHistory,
  updateInternsAttendance,
  getEventInformations,
} from '../services/eventInternsService';
import { sendCreated, sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const getEventInternsController = async (req: Request, res: Response) => {
  try {
    const { id_evento } = req.params;
    const result = await getEventIntern(parseInt(id_evento, 10));

    if (!result) {
      return res.status(404).json({ success: false, message: 'Event_Interns process not found' });
    }
    sendSuccess(res, result, 'Event_Interns process retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const registerInternController = async (req: Request, res: Response) => {
  try {
    const { id_evento } = req.params;
    const { id_becario } = req.body;
    const register = await registerIntern(parseInt(id_evento, 10), id_becario);
    sendCreated(res, register, 'Defense created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateInternType = async (req: Request, res: Response) => {
  try {
    const { id_evento, id_becario } = req.params;
    const { status } = req.body;
    const result = await updateInternsType(
      parseInt(id_evento, 10),
      parseInt(id_becario, 10),
      status
    );
    sendSuccess(res, result, 'Update Intern process retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const deleteRegistrationController = async (req: Request, res: Response) => {
  try {
    const { id_evento, id_becario } = req.params;
    const result = await cancelInternRegistration(parseInt(id_evento, 10), parseInt(id_becario));
    sendSuccess(res, result, 'Delete Registrations process retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateEventHistoryController = async (req: Request, res: Response) => {
  try {
    const { id_evento } = req.params;
    const updateEvents = await updateEventHistory(parseInt(id_evento, 10));
    sendCreated(res, updateEvents, 'Event updated succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateAttendanceController = async (req: Request, res: Response) => {
  try {
    const { id_evento, id_becario } = req.params;
    const { new_status } = req.body;
    const result = await updateInternsAttendance(parseInt(id_evento, 10), parseInt(id_becario, 10), new_status);
    sendSuccess(res, result, 'Attendance updated succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getEventInformationsController = async(req: Request, res: Response) => {
  try {
    const result = await getEventInformations();

    if (!result) {
      return res.status(404).json({ success: false, message: 'Event_Interns process not found' });
    }
    sendSuccess(res, result, 'Event_Interns process retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
}