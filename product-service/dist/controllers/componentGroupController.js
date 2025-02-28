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
exports.searchComponentGroups = exports.deleteComponentGroup = exports.updateComponentGroup = exports.getComponentGroupById = exports.getAllComponentGroups = exports.createComponentGroup = void 0;
const ComponentGroup_repository_1 = require("../repositories/ComponentGroup.repository");
const shared_constants_1 = require("shared-constants");
/**
 * @desc Create Component Group
 * @route POST /api/component/create-component
 */
const createComponentGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { componentName } = req.body;
        const newComponentGroup = yield (0, ComponentGroup_repository_1.saveComponentGroup)(componentName);
        shared_constants_1.logger.info("New Component Group Created");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.CREATED,
            res,
            message: shared_constants_1.HttpResponseMessages.CREATED,
            data: newComponentGroup,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error creating component group,", error);
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.createComponentGroup = createComponentGroup;
/**
 * @desc Fetch all Component Group
 * @route GET /api/component/
 */
const getAllComponentGroups = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield (0, ComponentGroup_repository_1.getComponentGroups)();
        shared_constants_1.logger.info("Component Groups Fetched Successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: groups,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error fetching component groups");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.getAllComponentGroups = getAllComponentGroups;
/**
 * @desc Fetch Component Group by ID
 * @route GET /api/component/:id
 */
const getComponentGroupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const group = yield (0, ComponentGroup_repository_1.getComponentGroupId)(id);
        if (!group) {
            shared_constants_1.logger.info("Component group not found");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NO_CONTENT,
                data: "Component Group not found with ID",
            });
            return;
        }
        shared_constants_1.logger.info("Component group found with ID");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: group,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error fetching component group with ID", error);
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.getComponentGroupById = getComponentGroupById;
/**
 * @desc Update Component Group by ID
 * @route POST /api/component/update-component/:id
 */
const updateComponentGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedGroup = yield (0, ComponentGroup_repository_1.updateComponentGroupID)(id, updateData);
        if (!updatedGroup) {
            shared_constants_1.logger.info("Component group not found");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NO_CONTENT,
                data: "Component Group not found with ID",
            });
            return;
        }
        shared_constants_1.logger.info("Component group updated successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: updatedGroup,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error updating component group");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.updateComponentGroup = updateComponentGroup;
/**
 * @desc Delete Component Group by ID
 * @route POST /api/component/delete-component/:id
 */
const deleteComponentGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    // Early return for invalid IDs
    if (!ids || ids.length === 0) {
        shared_constants_1.logger.error("No IDs provided");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
            res,
            message: shared_constants_1.HttpResponseMessages.BAD_REQUEST,
            data: "Please provide at least one ID to delete",
        });
        return;
    }
    try {
        const deletedGroup = yield (0, ComponentGroup_repository_1.deleteComponentGroups)(ids);
        // Early return if no components were deleted
        if (deletedGroup.modifiedCount === 0) {
            shared_constants_1.logger.error("Categories not found or already deleted");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
                data: "Categories not found or already deleted with the provided IDs",
            });
            return;
        }
        // Success response
        shared_constants_1.logger.info(`${deletedGroup.modifiedCount} Components deleted successfully`);
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: `Component group, ${deletedGroup.modifiedCount} Deleted Successfully`,
        });
    }
    catch (error) {
        // Handle errors
        shared_constants_1.logger.error("Error deleting component group", error);
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.deleteComponentGroup = deleteComponentGroup;
/**
 * @desc Search Component Group by name
 * @route GET /api/component/search
 */
const searchComponentGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentName = req.query.key || ""; // Extract from query params
        if (!componentName || typeof componentName !== "string") {
            shared_constants_1.logger.error("Invalid component name provided.");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
                res,
                message: shared_constants_1.HttpResponseMessages.BAD_REQUEST,
                data: "Component name must be a string and provided in query parameters.",
            });
            return;
        }
        const groups = yield (0, ComponentGroup_repository_1.searchComponentGroup)(componentName);
        shared_constants_1.logger.info("Component groups fetch successfully");
        if (groups.length === 0) {
            shared_constants_1.logger.info("No component groups found matching the provided name.");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.OK,
                res,
                message: shared_constants_1.HttpResponseMessages.SUCCESS,
                data: "No component groups found.",
            });
            return;
        }
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: groups,
        });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while searching component group by name => ${error}`);
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.searchComponentGroups = searchComponentGroups;
