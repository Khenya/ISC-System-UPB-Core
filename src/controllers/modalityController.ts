import { Request, Response } from 'express';
import * as ModalityInteractor from '../interactors/modalityInteractor';
import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';

export const getModalitiesController = async (req: Request, res: Response) => {
  try {
    const modalities = await ModalityInteractor.getModalities();
    if (!modalities) {
      return res.status(404).json({ success: false, message: 'Modalities not found' });
    }
    sendSuccess(res, modalities, 'Modalities retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
