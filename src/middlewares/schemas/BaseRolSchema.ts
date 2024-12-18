import Joi from 'joi';

const baseRolSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Category is required.',
  }),
});

export default baseRolSchema;
