import { Router } from "express";
import { register, login, logout } from "../controllers/userController";

const router = Router();

// Ensuring correct middleware types
router.post("/register", async (req, res, next) => {
  try {
	await register(req, res, next);
  } catch (error) {
	next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    await login(req, res, next);
  } catch (error) {
    next(error);
  }
});
router.post("/logout", async (req, res, next) => {
  try {
    await logout(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
