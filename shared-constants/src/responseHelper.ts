import { Response } from "express";

interface ResponseData {
  statusCode: number;
  res: Response;
  message: string;
  data?: any;
  error?: any;
}

export const sendResponse = ({
  statusCode,
  res,
  message,
  data,
  error,
}: ResponseData) => {
  const responseObject: any = { statusCode, message };

  if (data) responseObject.data = data;
  if (error) responseObject.error = error;

  res.status(statusCode).json(responseObject);
};
