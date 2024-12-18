import { Request, Response } from 'express';
import {
  updateHours,
  getInternById,
  getRecordInterns,
  getInformationsIntern,
  getMyEventsInternService,
} from '../services/internService';
import { sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const updateHoursController = async (req: Request, res: Response) => {
  try {
    const { intern_id } = req.params;
    const { type, hours } = req.body;
    const updateHoursIntern = await updateHours(parseInt(intern_id, 10), type, hours);
    if (!updateHoursIntern) {
      return res.status(404).json({ success: false, message: 'Interns process not found' });
    }
    sendSuccess(res, updateHoursIntern, 'Interns process retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getInternsById = async (req: Request, res: Response) => {
  try {
    const { intern_id } = req.params;
    const intern = await getInternById(parseInt(intern_id, 10));
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    sendSuccess(res, intern, 'Interns retrieved succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getRecordInternsController = async (req: Request, res: Response) => {
  try {
    const { intern_id } = req.params;
    const events = await getRecordInterns(parseInt(intern_id, 10));
    if (!events) {
      return res.status(404).json({ success: false, message: 'Interns process not found' });
    }
    sendSuccess(res, events, 'Events retrieved succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getInformationsInternController = async (req: Request, res: Response) => {
  try {
    const { intern_id } = req.params;
    const infoIntern = await getInformationsIntern(parseInt(intern_id, 10));
    if (!infoIntern) {
      return res.status(404).json({ success: false, message: 'Interns process not found' });
    }
    sendSuccess(res, infoIntern, 'Events retrieved succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getMyEventsInternController = async (req: Request, res: Response) => {
  try {
    const { intern_id } = req.params;
    const events = await getMyEventsInternService(parseInt(intern_id, 10));
    if (!events) {
      return res.status(404).json({ success: false, message: 'Interns process not found' });
    }
    sendSuccess(res, events, 'Events retrieved succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
