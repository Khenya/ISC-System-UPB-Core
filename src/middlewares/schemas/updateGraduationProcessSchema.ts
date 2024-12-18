import Joi from 'joi';

const updateGraduationProcessSchema = Joi.object({
  student_id: Joi.number().integer().optional().messages({
    'number.base': 'Student ID must be an integer',
  }),
  tutor_id: Joi.number().integer().optional().messages({
    'number.base': 'Tutor ID must be an integer',
  }),
  modality_id: Joi.number().integer().optional().messages({
    'number.base': 'Modality ID must be an integer',
  }),
  project_name: Joi.string().optional(),
  period: Joi.string().optional(),
  date_seminar_enrollment: Joi.date().allow(null).optional().messages({
    'date.base': 'Date of seminar enrollment must be a valid date or null',
  }),
  reviewer_approval: Joi.boolean().optional(),
  reviewer_id: Joi.number().integer().optional().messages({
    'number.base': 'Reviewer ID must be an integer',
  }),
  reviewer_letter: Joi.boolean().optional(),
  seminar_enrollment: Joi.boolean().optional(),
  stage_id: Joi.number().integer().optional().messages({
    'number.base': 'Stage ID must be an integer',
  }),
  tutor_approval: Joi.boolean().optional(),
  tutor_letter: Joi.boolean().optional(),
  date_tutor_assignament: Joi.date().allow(null).optional(),
  tutor_approval_date: Joi.date().allow(null).optional(),
  reviewer_approval_date: Joi.date().allow(null).optional(),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided',
  });

export { updateGraduationProcessSchema };
