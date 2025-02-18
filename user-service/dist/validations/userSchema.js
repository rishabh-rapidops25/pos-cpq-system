"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
// src/schemas/userSchema.ts
const joi_1 = __importDefault(require("joi"));
// Register Schema with enhanced validation checks
exports.registerSchema = joi_1.default.object({
    firstName: joi_1.default.string()
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
    lastName: joi_1.default.string()
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
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        "string.base": "Email should be a string.",
        "string.email": "Email format is invalid.",
        "any.required": "Email is required.",
    }),
    password: joi_1.default.string()
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
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        "string.base": "Email should be a string.",
        "string.email": "Email format is invalid.",
        "any.required": "Email is required.",
    }),
    password: joi_1.default.string().min(6).max(20).required().messages({
        "string.base": "Password should be a string.",
        "string.empty": "Password cannot be empty.",
        "string.min": "Password should have at least 6 characters.",
        "string.max": "Password should not exceed 20 characters.",
        "any.required": "Password is required.",
    }),
});
