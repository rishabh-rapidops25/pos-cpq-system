import Joi from "joi";
import { Request, Response, NextFunction } from "express";
export declare const validate: (schema: Joi.ObjectSchema, property?: "body" | "params" | "query") => (req: Request, res: Response, next: NextFunction) => void;
