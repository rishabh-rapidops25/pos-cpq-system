"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_error_1 = require("./custom-error");
const constants_1 = require("../constants");
class NotAuthorizedError extends custom_error_1.CustomError {
    constructor() {
        super("Not Authorized");
        this.statusCode = constants_1.HttpStatusCodes.UNAUTHORIZED;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not authorized" }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
