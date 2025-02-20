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
exports.calculateFinalPrice = void 0;
const PricingOption_1 = require("../models/PricingOption");
const calculateFinalPrice = (basePrice, selectedColors, // Optional price field
selectedMounts, // Optional price field
selectedMaterials // Optional price field
) => __awaiter(void 0, void 0, void 0, function* () {
    let finalPrice = basePrice;
    // Calculate price for colors
    let totalColorPrice = 0;
    const colorNames = selectedColors.map((color) => color.colorCode); // Extract only colorCode
    const colorPricingData = yield PricingOption_1.PricingOption.find({
        type: "color",
        name: { $in: colorNames }, // Match color codes
    });
    // Add price from the request for selected colors
    selectedColors.forEach(({ colorCode, price }) => {
        totalColorPrice += price || 0; // If price exists, add it
    });
    // Add any missing color prices from the database if not included in request
    colorPricingData.forEach((color) => {
        if (!selectedColors.some(({ colorCode }) => colorCode === color.name)) {
            totalColorPrice += color.price; // Add price from DB if missing
        }
    });
    // Calculate price for mounts
    let totalMountPrice = 0;
    const mountNames = selectedMounts.map((mount) => mount.mountType); // Extract only mountType
    const mountPricingData = yield PricingOption_1.PricingOption.find({
        type: "mount",
        name: { $in: mountNames }, // Match mount types
    });
    // Add price from the request for selected mounts
    selectedMounts.forEach(({ mountType, price }) => {
        totalMountPrice += price || 0; // If price exists, add it
    });
    // Add any missing mount prices from the database if not included in request
    mountPricingData.forEach((mount) => {
        if (!selectedMounts.some(({ mountType }) => mountType === mount.name)) {
            totalMountPrice += mount.price; // Add price from DB if missing
        }
    });
    // Calculate price for materials
    let totalMaterialPrice = 0;
    const materialNames = selectedMaterials.map((material) => material.materialType); // Extract only materialType
    const materialPricingData = yield PricingOption_1.PricingOption.find({
        type: "material",
        name: { $in: materialNames }, // Match material types
    });
    // Add price from the request for selected materials
    selectedMaterials.forEach(({ materialType, price }) => {
        totalMaterialPrice += price || 0; // If price exists, add it
    });
    // Add any missing material prices from the database if not included in request
    materialPricingData.forEach((material) => {
        if (!selectedMaterials.some(({ materialType }) => materialType === material.name)) {
            totalMaterialPrice += material.price; // Add price from DB if missing
        }
    });
    // Add all the additional prices to the final price
    finalPrice += totalColorPrice + totalMountPrice + totalMaterialPrice;
    return finalPrice;
});
exports.calculateFinalPrice = calculateFinalPrice;
