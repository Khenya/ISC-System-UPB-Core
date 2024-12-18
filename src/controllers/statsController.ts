import { Request, Response } from 'express';
import * as StastInteractor from '../interactors/statsInteractor';
import { sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const getStats = async (req: Request, res: Response) => {
  try {
    // const stats = await StastInteractor.getStats();
    sendSuccess(res, [], 'Stats retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
