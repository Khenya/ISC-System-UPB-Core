import Joi from 'joi';

const baseUserSchema = {
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
  }),
  lastname: Joi.string().optional().messages({
    'any.required': 'Last name is required.',
  }),
  mothername: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  code: Joi.string().required().messages({
    'any.required': 'Code is required.',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Phone name is required.',
  }),
};

const createAdminSchema = Joi.object({
  ...baseUserSchema,
});

const createStudentSchema = Joi.object({
  ...baseUserSchema,
});

const createProfessorSchema = Joi.object({
  ...baseUserSchema,
  degree: Joi.string().required().messages({
    'any.required': 'Degree name is required.',
  }),
});

export { createAdminSchema, createStudentSchema, createProfessorSchema };
