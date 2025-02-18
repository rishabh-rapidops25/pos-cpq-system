// src/schemas/userSchema.ts
import Joi from "joi";

// Register Schema with enhanced validation checks
export const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.base": "First name should be a string.",
      "string.empty": "First name cannot be empty.",
      "string.min": "First name should have at least 2 characters.",
      "string.max": "First name should not exceed 50 characters.",
      "string.pattern.base": "First name can only contain letters and spaces.",
      "any.required": "First name is required.",
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.base": "Last name should be a string.",
      "string.empty": "Last name cannot be empty.",
      "string.min": "Last name should have at least 2 characters.",
      "string.max": "Last name should not exceed 50 characters.",
      "string.pattern.base": "Last name can only contain letters and spaces.",
      "any.required": "Last name is required.",
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
    .pattern(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\];:'"<>,.?/\\|`~]).*$/
    )
    .required()
    .messages({
      "string.base": "Password should be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password should have at least 8 characters.",
      "string.max": "Password should not exceed 20 characters.",
      "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character.",
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

  password: Joi.string().min(6).max(20).required().messages({
    "string.base": "Password should be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should have at least 6 characters.",
    "string.max": "Password should not exceed 20 characters.",
    "any.required": "Password is required.",
  }),
});
