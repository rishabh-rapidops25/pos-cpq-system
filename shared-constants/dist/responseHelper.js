"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = exports.sendResponse = void 0;
// responseHelper.ts
const constants_1 = require("./constants");
const sendResponse = (res, { statusCode, message, error = null, data = null }) => {
    const response = {
        statusCode,
        httpResponse: constants_1.HttpResponseMessages[message] ||
            "Unknown response", // Get the response message dynamically
        error,
        message,
        data,
    };
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
// Success response for reusability:
const sendSuccess = (res, data, message = constants_1.HttpResponseMessages.SUCCESS) => {
    (0, exports.sendResponse)(res, {
        statusCode: constants_1.HttpStatusCodes.OK,
        message,
        data,
    });
};
exports.sendSuccess = sendSuccess;
// Error response for reusability:
const sendError = (res, statusCode, errorCode, message) => {
    (0, exports.sendResponse)(res, {
        statusCode,
        message,
        error: constants_1.ErrorMessageCodes[errorCode] ||
            "UNKNOWN_ERROR",
    });
};
exports.sendError = sendError;
