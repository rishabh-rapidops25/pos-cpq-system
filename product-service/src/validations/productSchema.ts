import Joi from "joi";

export const productSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z0-9\s]+$/)
    .required()
    .custom((value) => value.toLowerCase()) // Convert to lowercase
    .messages({
      "string.base": "Product name should be a string.",
      "string.empty": "Product name cannot be empty.",
      "string.min": "Product name should have at least 3 characters.",
      "string.max": "Product name should not exceed 100 characters.",
      "string.pattern.base":
        "Product name can only contain letters, numbers, and spaces.",
      "any.required": "Product name is required.",
    }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price should be a number.",
    "number.positive": "Price should be a positive number.",
    "number.precision": "Price can have up to 2 decimal places.",
    "any.required": "Price is required.",
  }),

  category: Joi.string()
    .min(3)
    .max(50)
    .required()
    .custom((value) => value.toLowerCase()) // Convert to lowercase
    .messages({
      "string.base": "Category should be a string.",
      "string.empty": "Category cannot be empty.",
      "string.min": "Category should have at least 3 characters.",
      "string.max": "Category should not exceed 50 characters.",
      "any.required": "Category is required.",
    }),

  inStock: Joi.boolean().required().messages({
    "boolean.base": "InStock should be a boolean.",
    "any.required": "InStock is required.",
  }),

  description: Joi.string()
    .max(500)
    .optional()
    .custom((value) => value.toLowerCase()) // Convert to lowercase
    .messages({
      "string.base": "Description should be a string.",
      "string.max": "Description should not exceed 500 characters.",
    }),

  imageURL: Joi.string().uri().optional().messages({
    "string.base": "Image URL should be a string.",
    "string.uri": "Image URL must be a valid URL.",
  }),

  colors: Joi.array()
    .items(
      Joi.object({
        colorCode: Joi.string()
          .min(3)
          .max(50)
          .custom((value) => value.toLowerCase())
          .required(),
        price: Joi.number().positive().precision(2).required(),
      })
    )
    .optional()
    .messages({
      "array.base": "Colors should be an array.",
      "array.items":
        "Each color should be an object with 'colorCode' and 'price'.",
    }),

  mount: Joi.array()
    .items(
      Joi.object({
        mountType: Joi.string()
          .valid("inside", "outside")
          .custom((value) => value.toLowerCase())
          .required(),
        price: Joi.number().positive().precision(2).required(),
      })
    )
    .optional()
    .messages({
      "array.base": "Mount should be an array.",
      "array.items":
        "Each mount option should be an object with 'mountType' and 'price'.",
    }),

  materials: Joi.array()
    .items(
      Joi.object({
        materialType: Joi.string()
          .valid("wood", "aluminum", "cloth")
          .custom((value) => value.toLowerCase())
          .required(),
        price: Joi.number().positive().precision(2).required(),
      })
    )
    .optional()
    .messages({
      "array.base": "Materials should be an array.",
      "array.items":
        "Each material should be an object with 'materialType' and 'price'.",
    }),
});
