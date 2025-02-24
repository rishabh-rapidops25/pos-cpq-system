"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const ormconfig_1 = require("../config/ormconfig");
const User_1 = require("../models/User");
exports.userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
