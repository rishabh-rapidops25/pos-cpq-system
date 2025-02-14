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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Ensuring correct middleware types
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userController_1.register)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userController_1.login)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userController_1.logout)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
