import { CustomError } from "./custom-error";
import { HttpStatusCodes } from "../constants";
export class NotFoundError extends CustomError {
  statusCode = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
