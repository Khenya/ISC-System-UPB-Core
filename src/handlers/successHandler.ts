import { Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendSuccess = (res: Response, data: any, message: string) => {
  res.status(200).json({
    success: true,
    data,
    message,
    error: null,
    code: 200,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendCreated = (res: Response, data: any, message: string) => {
  res.status(201).json({
    success: true,
    data,
    message,
    error: null,
    code: 201,
  });
};
