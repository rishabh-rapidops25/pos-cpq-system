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
exports.calculatePdfFinalPrice = void 0;
const PricingOption_1 = require("../models/PricingOption");
// Helper function to calculate total price for a category (color, mount, or material)
const calculateTotalPrice = (selectedItems, type) => __awaiter(void 0, void 0, void 0, function* () {
    let totalPrice = 0;
    // Extract names from selected items
    const itemNames = selectedItems.map((item) => item.name);
    // Fetch pricing data from DB
    const pricingData = yield PricingOption_1.PricingOption.find({
        type,
        name: { $in: itemNames },
    });
    // Combine selected item prices (if provided) and database prices
    selectedItems.forEach(({ name, price }) => {
        var _a;
        const dbPrice = ((_a = pricingData.find((item) => item.name === name)) === null || _a === void 0 ? void 0 : _a.price) || 0;
        totalPrice += price !== null && price !== void 0 ? price : dbPrice; // Use provided price, otherwise use DB price
    });
    return totalPrice;
});
const calculatePdfFinalPrice = (basePrice, selectedColors, selectedMounts, selectedMaterials) => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate total price for each category in parallel
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
    // Calculate final price
    const finalPrice = basePrice + totalColorPrice + totalMountPrice + totalMaterialPrice;
    return finalPrice;
});
exports.calculatePdfFinalPrice = calculatePdfFinalPrice;
