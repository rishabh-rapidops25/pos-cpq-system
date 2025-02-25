"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = ({ statusCode, res, message, data, error, }) => {
    const responseObject = { message };
    if (data)
        responseObject.data = data;
    if (error)
        responseObject.error = error;
    res.status(statusCode).json(responseObject);
};
exports.sendResponse = sendResponse;
