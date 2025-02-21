import { CustomError } from "./custom-error";
import { HttpStatusCodes } from "../constants";
export class BadRequestError extends CustomError {
  statusCode = HttpStatusCodes.BAD_REQUEST;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
