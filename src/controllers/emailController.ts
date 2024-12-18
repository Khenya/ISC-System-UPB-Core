import { Request, Response } from 'express';
import * as EmailInteractor from '../interactors/emailInteractor';
import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';

export const sendEmail = async (req: Request, res: Response) => {
  const emailData = req.body;
  try {
    await EmailInteractor.sendEmail(emailData);
    sendSuccess(res, {}, 'Email sent successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
