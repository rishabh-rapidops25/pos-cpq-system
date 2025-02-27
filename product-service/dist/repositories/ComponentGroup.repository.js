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
exports.searchComponentGroup = exports.deleteComponentGroups = exports.updateComponentGroupID = exports.getComponentGroupId = exports.getComponentGroups = exports.saveComponentGroup = void 0;
const shared_constants_1 = require("shared-constants");
const ComponentGroup_1 = __importDefault(require("../models/ComponentGroup"));
// Function to save a new component group
const saveComponentGroup = (componentName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComponentGroup = new ComponentGroup_1.default({ componentName });
        return yield newComponentGroup.save();
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while saving component groups => ${error}`);
        throw new Error("Error while saving component group details in DB");
    }
});
exports.saveComponentGroup = saveComponentGroup;
// Function to get all component groups
const getComponentGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ComponentGroup_1.default.find({ isDeleted: 0 });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while fetching component groups => ${error}`);
        throw new Error("Error fetching component groups from DB");
    }
});
exports.getComponentGroups = getComponentGroups;
// Function to get a component group by ID
const getComponentGroupId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ComponentGroup_1.default.findById({ _id: id, isDeleted: 0 });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while fetching component group by ID => ${error}`);
        throw new Error("Error fetching component group from DB");
    }
});
exports.getComponentGroupId = getComponentGroupId;
// Function to update a component group
const updateComponentGroupID = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ComponentGroup_1.default.findOneAndUpdate({ _id: id, isDeleted: 0 }, updateData, { new: true });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while updating component group by ID => ${error}`);
        throw new Error("Error updating component group in DB");
    }
});
exports.updateComponentGroupID = updateComponentGroupID;
// Function to delete a component group
const deleteComponentGroups = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ComponentGroup_1.default.updateMany({ _id: { $in: ids }, isDeleted: { $ne: 1 } }, // Ensure that categories are not already deleted
        { $set: { isDeleted: 1 } }, // Set isDeleted to 1
        { new: true } // Returns the updated categories
        );
        return result;
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while deleting component group by IDs => ${error}`);
        throw new Error("Error deleting component group from DB");
    }
});
exports.deleteComponentGroups = deleteComponentGroups;
// Function to search component groups by name
const searchComponentGroup = (componentName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!componentName || typeof componentName !== "string") {
            throw new Error("Invalid component name provided.");
        }
        return yield ComponentGroup_1.default.find({
            componentName: { $regex: new RegExp(componentName, "i") },
            isDeleted: 0,
        });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while searching component group by name => ${error}`);
        throw new Error("Error searching component groups in DB");
    }
});
exports.searchComponentGroup = searchComponentGroup;
