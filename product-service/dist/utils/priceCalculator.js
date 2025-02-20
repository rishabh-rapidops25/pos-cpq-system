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
// Helper function to calculate total price for a category (color, mount, or material)
const calculateTotalPrice = (selectedItems, type) => __awaiter(void 0, void 0, void 0, function* () {
    let totalPrice = 0;
    // Extract the names and find the pricing data in parallel
    const itemNames = selectedItems.map((item) => item.name);
    const pricingData = yield PricingOption_1.PricingOption.find({
        type,
        name: { $in: itemNames },
    });
    // Add price from the request for selected items
    selectedItems.forEach(({ price }) => {
        totalPrice += price || 0; // If price exists, add it
    });
    // Add any missing item prices from the database if not included in the request
    pricingData.forEach((item) => {
        if (!selectedItems.some(({ name }) => name === item.name)) {
            totalPrice += item.price; // Add price from DB if missing
        }
    });
    return totalPrice;
});
const calculateFinalPrice = (basePrice, selectedColors, selectedMounts, selectedMaterials) => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate the price for each category (color, mount, material) in parallel
    const [totalColorPrice, totalMountPrice, totalMaterialPrice] = yield Promise.all([
        calculateTotalPrice(selectedColors.map(({ colorCode, price }) => ({
            name: colorCode,
            price,
        })), "color"),
        calculateTotalPrice(selectedMounts.map(({ mountType, price }) => ({
            name: mountType,
            price,
        })), "mount"),
        calculateTotalPrice(selectedMaterials.map(({ materialType, price }) => ({
            name: materialType,
            price,
        })), "material"),
    ]);
    // Add all the additional prices to the final price
    const finalPrice = basePrice + totalColorPrice + totalMountPrice + totalMaterialPrice;
    return finalPrice;
});
exports.calculateFinalPrice = calculateFinalPrice;
