import Joi from 'joi';

const rolePermissionsSchema = Joi.object({
  role_id: Joi.number().required().messages({
    'any.required': 'role id is required to search by name.',
  }),
  permission_id: Joi.number().required().messages({
    'any.required': 'permission id is required to search by name.',
  }),
});

export default rolePermissionsSchema;
