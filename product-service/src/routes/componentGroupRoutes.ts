import express from "express";
import {
  createComponentGroup,
  getAllComponentGroups,
  getComponentGroupById,
  updateComponentGroup,
  deleteComponentGroup,
  searchComponentGroups,
} from "../controllers/componentGroupController";
import {
  getAllComponentSchema,
  createComponentGroupSchema,
  deleteComponentSchema,
  updateComponentGroupSchema,
} from "../validations/componentSchema";
import { validate } from "shared-constants";

const router = express.Router();
router.get("/", getAllComponentGroups);
router.get("/search", searchComponentGroups);

router.get("/:id", getComponentGroupById);
router.post(
  "/create-component",
  validate(createComponentGroupSchema),
  createComponentGroup
);

router.post(
  "/update-component/:id",
  validate(updateComponentGroupSchema),
  updateComponentGroup
);
router.post(
  "/delete-component",
  validate(deleteComponentSchema),
  deleteComponentGroup
);

export default router;
