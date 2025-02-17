"use strict";
// import Joi from "joi";
// import { Request, Response, NextFunction } from "express";
// import { logger } from "../utils/logger";
// import { HttpStatusCodes, HttpResponseMessages } from "shared-constants";
// // Validation middleware
// export const validate = (
//   schema: Joi.ObjectSchema,
//   property: "body" | "params" | "query" = "body"
// ) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const { error } = schema.validate(req[property], { abortEarly: false });
//     if (error) {
//       const errorMessages = error.details.map((detail) => detail.message);
//       logger.info("Validation error");
//       res.status(400).json({ errors: errorMessages });
//       return;
//     }
//     next();
//   };
// };
