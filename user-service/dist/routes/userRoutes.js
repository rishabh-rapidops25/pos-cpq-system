"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validation_1 = require("../middlewares/validation");
const userSchema_1 = require("../validations/userSchema"); // Import schemas
const router = (0, express_1.Router)();
// Register route with validation middleware
router.post("/register", (0, validation_1.validate)(userSchema_1.registerSchema), userController_1.register);
// Login route with validation middleware
router.post("/login", (0, validation_1.validate)(userSchema_1.loginSchema), userController_1.login);
// Logout route (no validation needed for logout, as we don't expect a body)
router.post("/logout", userController_1.logout);
exports.default = router;
