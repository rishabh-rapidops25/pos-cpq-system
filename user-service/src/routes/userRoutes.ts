// src/routes/user.routes.ts
import { Router } from "express";
import { register, login, logout } from "../controllers/userController";
import {validate}  from "../middlewares/validation";
import { registerSchema, loginSchema } from "../validations/userSchema"; // Import schemas

const router = Router();

// Register route with validation middleware
router.post("/register", validate(registerSchema), register);

// Login route with validation middleware
router.post("/login", validate(loginSchema), login);

// Logout route (no validation needed for logout, as we don't expect a body)
router.post("/logout", logout);

export default router;
