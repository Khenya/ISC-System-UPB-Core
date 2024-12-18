import Joi from 'joi';

const paramIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be an integer',
    'number.integer': 'ID must be a valid integer',
    'any.required': 'ID is required',
  }),
});

export { paramIdSchema };
