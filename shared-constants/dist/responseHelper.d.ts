import { Response } from "express";
interface ResponseData {
    statusCode: number;
    res: Response;
    message: string;
    data?: any;
    error?: any;
}
export declare const sendResponse: ({ statusCode, res, message, data, error, }: ResponseData) => void;
export {};
