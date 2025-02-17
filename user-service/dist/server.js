"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const shared_constants_1 = require("shared-constants");
const PORT = process.env.PORT || 3001;
const PROTOCOL = process.env.PROTOCOL || "http://localhost";
app_1.default.listen(PORT, () => {
    shared_constants_1.logger.info(`===============================================`);
    shared_constants_1.logger.info(`User-Service Server is running on port ${PORT}`);
    shared_constants_1.logger.info(`${PROTOCOL}:${PORT}/api/users`);
});
