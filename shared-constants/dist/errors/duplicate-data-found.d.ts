import { CustomError } from "./custom-error";
export declare class DuplicateDataFound extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
