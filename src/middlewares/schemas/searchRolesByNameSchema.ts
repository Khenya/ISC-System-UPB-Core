import Joi from 'joi';

const rolesByNameSchema = Joi.object({
  name: Joi.string().optional().messages({
    'any.required': 'Name is required to search by name.',
  }),
});

export default rolesByNameSchema;
