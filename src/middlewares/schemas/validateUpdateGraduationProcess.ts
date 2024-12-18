import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateUpdateGraduationProcess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      'number.base': 'ID must be an integer',
      'number.integer': 'ID must be a valid integer',
      'any.required': 'ID is required',
    }),
  });

  const { error: paramError } = paramSchema.validate({ id: req.params.id });

  if (paramError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: paramError.details.map(detail => detail.message).join(', '),
    });
  }

  const bodySchema = Joi.object({
    student_id: Joi.number().integer().optional().messages({
      'number.base': 'Modality ID must be an integer',
    }),
    modality_id: Joi.number().integer().optional().messages({
      'number.base': 'Modality ID must be an integer',
    }),
    project_name: Joi.string().optional(),
    period: Joi.string().optional(),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided',
    });

  const { error: bodyError } = bodySchema.validate(req.body, { abortEarly: false });

  if (bodyError) {
    const errorMessage = bodyError.details.map(detail => detail.message).join(', ');
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errorMessage,
    });
  }

  next();
};
