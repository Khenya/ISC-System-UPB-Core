import Joi from 'joi';

export const professorSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'El nombre es requerido',
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'El apellido es requerido',
  }),
  mothername: Joi.string().optional(),
  code: Joi.string().required().messages({
    'any.required': 'El código es requerido',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'El email es requerido',
    'string.email': 'El email no es válido',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'El teléfono es requerido',
  }),
  degree: Joi.string().required().messages({
    'any.required': 'El grado es requerido',
  }),
});
