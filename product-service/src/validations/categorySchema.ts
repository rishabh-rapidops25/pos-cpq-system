import Joi from "joi";

// Create Category Schema
export const createCategorySchema = Joi.object({
  categoryName: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z0-9\s]+$/)
    .required()
    .messages({
      "string.base": `"categoryName" should be a type of 'text'`,
      "string.empty": `"categoryName" cannot be an empty field`,
      "string.min": `"categoryName" should have a minimum length of {#limit}`,
      "string.max": `"categoryName" should have a maximum length of {#limit}`,
      "any.required": `"categoryName" is a required field`,
    }),

  code: Joi.number().integer().min(0).required().messages({
    "number.base": `"code" should be a type of 'number'`,
    "number.integer": `"code" must be an integer`,
    "number.min": `"code" must be at least {#limit}`,
    "any.required": `"code" is a required field`,
  }),

  status: Joi.string().valid("Active", "Inactive").required().messages({
    "any.only": `"status" must be one of 'Active' or 'Inactive'`,
    "any.required": `"status" is a required field`,
  }),

  description: Joi.string().max(500).optional().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.max": `"description" should have a maximum length of {#limit}`,
  }),
});

// Update Category Schema
export const updateCategorySchema = Joi.object({
  categoryName: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z0-9\s]+$/)
    .optional()
    .messages({
      "string.base": `"categoryName" should be a type of 'text'`,
      "string.empty": `"categoryName" cannot be an empty field`,
      "string.min": `"categoryName" should have a minimum length of {#limit}`,
      "string.max": `"categoryName" should have a maximum length of {#limit}`,
    }),

  code: Joi.number().integer().min(0).optional().messages({
    "number.base": `"code" should be a type of 'number'`,
    "number.integer": `"code" must be an integer`,
    "number.min": `"code" must be at least {#limit}`,
  }),

  status: Joi.string().valid("Active", "Inactive").optional().messages({
    "any.only": `"status" must be one of 'Active' or 'Inactive'`,
  }),

  description: Joi.string().max(500).optional().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.max": `"description" should have a maximum length of {#limit}`,
  }),
});
