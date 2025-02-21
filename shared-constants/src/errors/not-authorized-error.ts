import { CustomError } from "./custom-error";
import { HttpStatusCodes } from "../constants";
export class NotAuthorizedError extends CustomError {
  statusCode = HttpStatusCodes.UNAUTHORIZED;

  constructor() {
    super("Not Authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
