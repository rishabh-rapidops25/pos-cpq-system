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
const user_repository_1 = require("../repository/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_constants_1 = require("shared-constants");
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Hash Password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Check if user already exists
        const existingUser = yield user_repository_1.userRepository.findOne({ where: { email } });
        if (existingUser) {
            shared_constants_1.logger.error("Registration failed: Email already in use");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
                res,
                message: shared_constants_1.HttpResponseMessages.BAD_REQUEST,
            });
            return;
        }
        // Create & Save User
        const user = user_repository_1.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield user_repository_1.userRepository.save(user);
        let userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
        shared_constants_1.logger.info("User Created Successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.CREATED,
            res,
            message: shared_constants_1.HttpResponseMessages.CREATED,
            data: userData,
        });
    }
    catch (err) {
        shared_constants_1.logger.error("Error while creating user");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: err,
        });
        return;
    }
});
exports.register = register;
// Login an existing user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find User
        const user = yield user_repository_1.userRepository.findOne({ where: { email } });
        // If user does not exist in the database
        if (!user) {
            shared_constants_1.logger.warn("Login attempt failed: User not found");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
                data: "User not found",
            });
            return;
        }
        // Check if password is correct
        if (!(yield bcryptjs_1.default.compare(password, user.password))) {
            shared_constants_1.logger.warn("Login attempt failed: Invalid credentials");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.UNAUTHORIZED,
                res,
                message: shared_constants_1.HttpResponseMessages.UNAUTHORIZED,
                data: "Invalid Credentials",
            });
            return;
        }
        // Ensure JWT Secret is available
        if (!process.env.JWT_SECRET) {
            shared_constants_1.logger.error("JWT Secret key is not defined");
            throw new Error("Secret key is not defined");
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.firstName }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        let userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
        };
        shared_constants_1.logger.info("User logged in successfully...");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: userData,
        });
    }
    catch (err) {
        shared_constants_1.logger.error("Error while logging in user");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: err,
        });
        return;
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
