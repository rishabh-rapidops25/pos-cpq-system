"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const componentGroupController_1 = require("../controllers/componentGroupController");
const componentSchema_1 = require("../validations/componentSchema");
const shared_constants_1 = require("shared-constants");
const router = express_1.default.Router();
router.post("/create-component", (0, shared_constants_1.validate)(componentSchema_1.createComponentGroupSchema), componentGroupController_1.createComponentGroup);
router.get("/", componentGroupController_1.getAllComponentGroups);
router.get("/:id", componentGroupController_1.getComponentGroupById);
router.post("/update-component/:id", (0, shared_constants_1.validate)(componentSchema_1.updateComponentGroupSchema), componentGroupController_1.updateComponentGroup);
router.post("/delete-component", (0, shared_constants_1.validate)(componentSchema_1.deleteComponentSchema), componentGroupController_1.deleteComponentGroup);
router.post("/search", (0, shared_constants_1.validate)(componentSchema_1.getAllComponentSchema), componentGroupController_1.searchComponentGroups);
exports.default = router;
