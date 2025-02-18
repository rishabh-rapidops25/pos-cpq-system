// responseHelper.ts
import {
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
} from "./constants";

interface ResponseOptions {
  statusCode: number;
  message: string;
  error?: string | null;
  data?: any;
}

export const sendResponse = (
  res: any,
  { statusCode, message, error = null, data = null }: ResponseOptions
) => {
  const response = {
    statusCode,
    httpResponse:
      HttpResponseMessages[message as keyof typeof HttpResponseMessages] ||
      "Unknown response", // Get the response message dynamically
    error,
    message,
    data,
  };

  res.status(statusCode).json(response);
};

// Success response for reusability:
export const sendSuccess = (
  res: any,
  data: any,
  message: string = HttpResponseMessages.SUCCESS
) => {
  sendResponse(res, {
    statusCode: HttpStatusCodes.OK,
    message,
    data,
  });
};

// Error response for reusability:
export const sendError = (
  res: any,
  statusCode: number,
  errorCode: string,
  message: string
) => {
  sendResponse(res, {
    statusCode,
    message,
    error:
      ErrorMessageCodes[errorCode as keyof typeof ErrorMessageCodes] ||
      "UNKNOWN_ERROR",
  });
};
