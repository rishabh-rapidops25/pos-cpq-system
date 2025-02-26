"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const logger_1 = require("./logger");
const constants_1 = require("./constants");
const responseHelper_1 = require("./responseHelper");
// Custom error logging function
const logValidationError = (error, req) => {
    const errorDetails = error.details.map((detail) => ({
        message: detail.message,
        path: detail.path.join("."), // Ensure proper formatting
        type: detail.type,
    }));
    logger_1.logger.error("Validation Error:", {
        method: req.method,
        url: req.originalUrl,
        errors: errorDetails,
    });
    return errorDetails;
};
const validate = (schema, property = "body") => (req, res, next) => {
    const { error } = schema.validate(req[property], {
        abortEarly: false, // Validate all properties
        allowUnknown: false, // Reject extra properties
        convert: true, // Convert types where necessary
    });
    if (error) {
        const errorMessages = error.details.map((detail) => ({
            message: detail.message,
            path: detail.path.join("."), // Properly format path
            type: detail.type,
        }));
        logger_1.logger.error("Validation Error:", {
            method: req.method,
            url: req.originalUrl,
            errors: errorMessages,
        });
        (0, responseHelper_1.sendResponse)({
            statusCode: constants_1.HttpStatusCodes.BAD_REQUEST,
            res,
            message: constants_1.ErrorMessageCodes.INVALID_REQUEST,
            error: errorMessages, // Now properly sending validation errors
        });
        return;
    }
    next();
};
exports.validate = validate;
