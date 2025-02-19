"use strict";
// export const calculateFinalPrice = (
//   price: number,
//   selectedOptions: Record<string, string[]>,
//   pricingRules: Record<string, Record<string, number>>
// ): number => {
//   let finalPrice = price;
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
//   // Iterate over each option in selectedOptions
//   for (const optionKey in selectedOptions) {
//     if (selectedOptions.hasOwnProperty(optionKey)) {
//       const selectedValues = selectedOptions[optionKey];
//       // Check if there are pricing rules for this option type
//       if (pricingRules[optionKey]) {
//         selectedValues.forEach((value) => {
//           if (pricingRules[optionKey][value]) {
//             finalPrice += pricingRules[optionKey][value]; // Add defined price
//           }
//         });
//       }
//     }
//   }
//   return finalPrice;
// };
const PricingOption_1 = require("../models/PricingOption");
const calculateFinalPrice = (basePrice, selectedColors, selectedMounts, selectedMaterials) => __awaiter(void 0, void 0, void 0, function* () {
    let finalPrice = basePrice;
    const selectedOptions = [
        ...selectedColors,
        ...selectedMounts,
        ...selectedMaterials,
    ];
    // Fetch predefined prices from the database
    const pricingData = yield PricingOption_1.PricingOption.find({
        name: { $in: selectedOptions },
    });
    // Add the additional costs
    pricingData.forEach((option) => {
        finalPrice += option.price;
    });
    return finalPrice;
});
exports.calculateFinalPrice = calculateFinalPrice;
