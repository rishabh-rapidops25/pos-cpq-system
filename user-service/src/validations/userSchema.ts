// src/schemas/userSchema.ts
import Joi from "joi";

// Register Schema with enhanced validation checks
export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.base": "Name should be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name should have at least 3 characters.",
      "string.max": "Name should not exceed 50 characters.",
      "string.pattern.base": "Name can only contain letters and spaces.",
      "any.required": "Name is required.",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email should be a string.",
      "string.email": "Email format is invalid.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\];:'"<>,.?/\\|`~]).*$/)
    .required()
    .messages({
      "string.base": "Password should be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password should have at least 8 characters.",
      "string.max": "Password should not exceed 20 characters.",
      "string.pattern.base": "Password must contain at least 1 uppercase letter, 1 number, and 1 special character.",
      "any.required": "Password is required.",
    }),
});

// Login Schema with enhanced validation checks
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email should be a string.",
      "string.email": "Email format is invalid.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.base": "Password should be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password should have at least 6 characters.",
      "string.max": "Password should not exceed 20 characters.",
      "any.required": "Password is required.",
    }),
});
