"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const logger_1 = require("./logger");
const constants_1 = require("./constants");
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
const createErrorResponse = (errors) => ({
    statusCode: constants_1.HttpStatusCodes.BAD_REQUEST,
    httpResponse: constants_1.HttpResponseMessages.BAD_REQUEST,
    errors,
});
// Custom error logging function
const logValidationError = (error, req) => {
    const errorDetails = error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
        type: detail.type,
    }));
    logger_1.logger.error("Validation Error:", {
        method: req.method,
        url: req.originalUrl,
        errors: errorDetails,
    });
};
// Validation middleware
const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            // Log validation error with details
            logValidationError(error, req);
            // Extract the error messages
            const errorMessages = error.details.map((detail) => detail.message);
            // Return the error response with details
            res
                .status(constants_1.HttpStatusCodes.BAD_REQUEST)
                .json(createErrorResponse(errorMessages));
            return;
        }
        // Proceed if validation passes
        next();
    };
};
exports.validate = validate;
