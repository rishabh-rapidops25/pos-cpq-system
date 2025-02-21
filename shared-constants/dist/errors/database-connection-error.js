"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
const constants_1 = require("../constants");
class DatabaseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super("Error connecting to db");
        this.statusCode = constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR;
        this.reason = "Error connecting to database";
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
