"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const ormconfig_1 = require("../config/ormconfig");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_constants_1 = require("shared-constants");
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Hash Password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Get Repository
        const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
        // Check if user already exists
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            shared_constants_1.logger.warn("Registration failed: Email already in use");
            res.status(shared_constants_1.HttpStatusCodes.BAD_REQUEST).json({
                statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
                httpResponse: shared_constants_1.HttpResponseMessages.BAD_REQUEST,
                message: "Email already in use",
            });
            return;
        }
        // Create & Save User
        const user = userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield userRepository.save(user);
        shared_constants_1.logger.info("User Created Successfully");
        res.status(shared_constants_1.HttpStatusCodes.CREATED).json({
            statusCode: shared_constants_1.HttpStatusCodes.CREATED,
            httpResponse: shared_constants_1.HttpResponseMessages.CREATED,
            message: "User Registered Successfully",
            userData: {
                id: user.id,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
            },
        });
    }
    catch (err) {
        shared_constants_1.logger.error("Error while creating user", err);
        res.status(shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            httpResponse: shared_constants_1.HttpResponseMessages.INTERNAL_SERVER_ERROR,
            error: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong while creating user",
        });
    }
});
exports.register = register;
// Login an existing user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Get Repository
        const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
        // Find User
        const user = yield userRepository.findOne({ where: { email } });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            shared_constants_1.logger.warn("Login attempt failed: Invalid credentials");
            res.status(shared_constants_1.HttpStatusCodes.UNAUTHORIZED).json({
                statusCode: shared_constants_1.HttpStatusCodes.UNAUTHORIZED,
                httpResponse: shared_constants_1.HttpResponseMessages.UNAUTHORIZED,
                message: "Invalid Credentials",
            });
            return;
        }
        // Ensure JWT Secret is available
        if (!process.env.JWT_SECRET) {
            shared_constants_1.logger.error("JWT Secret key is not defined");
            throw new Error("Secret key is not defined");
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(shared_constants_1.HttpStatusCodes.OK).json({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            httpResponse: shared_constants_1.HttpResponseMessages.SUCCESS,
            message: "User Logged In Successfully",
            userData: {
                id: user.id,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                token,
            },
        });
    }
    catch (err) {
        shared_constants_1.logger.error("Error while logging in user", err);
        res.status(shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            httpResponse: shared_constants_1.HttpResponseMessages.INTERNAL_SERVER_ERROR,
            error: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong while logging in",
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Frontend should handle token removal; backend can use a blacklist approach
        res.status(shared_constants_1.HttpStatusCodes.OK).json({
            message: "User Logged Out (Token should be removed on client side)",
        });
        return;
    }
    catch (err) {
        shared_constants_1.logger.error("Error while logout");
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}); // Create Token table whenever someone login the token which generated by with that user id it store it in token table and then while logout first we will compare token from req.body and then checks user id with current logged in user then we will deleted that token logout that user with the help of toke
exports.logout = logout;
