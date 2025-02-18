import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import { HttpStatusCodes, HttpResponseMessages } from "./constants";
// Validation middleware
// export const validate = (
//   schema: Joi.ObjectSchema,
//   property: "body" | "params" | "query" = "body"
// ) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const { error } = schema.validate(req[property], { abortEarly: false });

//     if (error) {
//       const errorMessages = error.details.map((detail) => detail.message);
//       logger.info("Validation error");
//       res.status(HttpStatusCodes.BAD_REQUEST).json({
//         statusCode: HttpStatusCodes.BAD_REQUEST,
//         httpResponse: HttpResponseMessages.BAD_REQUEST,
//         errors: errorMessages,
//       });
//       return;
//     }

//     next();
//   };
// };

// Centralized error response structure
const createErrorResponse = (errors: string[]) => ({
  statusCode: HttpStatusCodes.BAD_REQUEST,
  httpResponse: HttpResponseMessages.BAD_REQUEST,
  errors,
});

// Custom error logging function
const logValidationError = (error: Joi.ValidationError, req: Request) => {
  const errorDetails = error.details.map((detail) => ({
    message: detail.message,
    path: detail.path,
    type: detail.type,
  }));

  logger.error("Validation Error:", {
    method: req.method,
    url: req.originalUrl,
    errors: errorDetails,
  });
};

// Validation middleware
export const validate = (
  schema: Joi.ObjectSchema,
  property: "body" | "params" | "query" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      // Log validation error with details
      logValidationError(error, req);

      // Extract the error messages
      const errorMessages = error.details.map((detail) => detail.message);

      // Return the error response with details
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(createErrorResponse(errorMessages));
      return;
    }

    // Proceed if validation passes
    next();
  };
};
