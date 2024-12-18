import Joi from 'joi';

const studentCodeSchema = Joi.object({
  code: Joi.number().integer().required().messages({
    'number.base': 'ID must be an integer',
    'number.integer': 'ID must be a valid integer',
    'any.required': 'ID is required',
  }),
});

export { studentCodeSchema };
