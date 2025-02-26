"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = ({ statusCode, res, message, data = null, error = null, }) => {
    const responseObject = { statusCode, message };
    if (data)
        responseObject.data = data;
    if (error)
        responseObject.error = error;
    res.status(statusCode).json(responseObject);
};
exports.sendResponse = sendResponse;
