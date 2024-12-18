import { Request, Response } from 'express';
import {
  getEventsService,
  getEventsByIdService,
  createEventService,
  updateEventService,
  deleteEventService,
} from '../services/eventsService';

import { sendCreated, sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getEventsService();
    if (!events) {
      return res.status(404).json({ success: false, message: 'Events not found' });
    }
    sendSuccess(res, events, 'Events retrieved succesfully');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getEventsByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await getEventsByIdService(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    sendSuccess(res, event, 'Event retrieved succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createEventController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const event = await createEventService(body);
    sendCreated(res, event, 'Event created succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateEventController = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    const event = await updateEventService(body, params.id);
    sendCreated(res, event, 'Event updated succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const deleteEventController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await deleteEventService(id);
    sendSuccess(res, event, 'Event deleted succesfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};