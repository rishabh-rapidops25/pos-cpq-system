interface ResponseOptions {
    statusCode: number;
    message: string;
    error?: string | null;
    data?: any;
}
export declare const sendResponse: (res: any, { statusCode, message, error, data }: ResponseOptions) => void;
export declare const sendSuccess: (res: any, data: any, message?: string) => void;
export declare const sendError: (res: any, statusCode: number, errorCode: string, message: string) => void;
export {};
