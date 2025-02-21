import { CustomError } from "./custom-error";
import { HttpStatusCodes } from "../constants";
export class DuplicateDataFound extends CustomError {
  statusCode = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super("Email Already In Use");

    Object.setPrototypeOf(this, DuplicateDataFound.prototype);
  }

  serializeErrors() {
    return [{ message: "Data Duplication FOund" }];
  }
}
