"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateDataFound = void 0;
const custom_error_1 = require("./custom-error");
const constants_1 = require("../constants");
class DuplicateDataFound extends custom_error_1.CustomError {
    constructor() {
        super("Email Already In Use");
        this.statusCode = constants_1.HttpStatusCodes.BAD_REQUEST;
        Object.setPrototypeOf(this, DuplicateDataFound.prototype);
    }
    serializeErrors() {
        return [{ message: "Data Duplication FOund" }];
    }
}
exports.DuplicateDataFound = DuplicateDataFound;
