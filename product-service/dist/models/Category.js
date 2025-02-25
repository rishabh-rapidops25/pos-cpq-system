"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    categoryName: {
        type: String,
        required: [true, "Category Name Required"],
        minlength: 3,
        maxlength: 100,
        match: /^[A-Za-z0-9\s]+$/,
        unique: true,
    },
    code: {
        type: Number,
        required: [true, "Code required"],
        unique: true,
        min: 0,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    updatedOn: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: [true, "Enum Required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
exports.Category = mongoose_1.default.model("Category", CategorySchema);
