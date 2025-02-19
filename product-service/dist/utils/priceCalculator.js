"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFinalPrice = void 0;
const calculateFinalPrice = (price, selectedOptions, pricingRules) => {
    let finalPrice = price;
    // Iterate over each option in selectedOptions
    for (const optionKey in selectedOptions) {
        if (selectedOptions.hasOwnProperty(optionKey)) {
            const selectedValues = selectedOptions[optionKey];
            // Check if there are pricing rules for this option type
            if (pricingRules[optionKey]) {
                selectedValues.forEach((value) => {
                    if (pricingRules[optionKey][value]) {
                        finalPrice += pricingRules[optionKey][value]; // Add defined price
                    }
                });
            }
        }
    }
    return finalPrice;
};
exports.calculateFinalPrice = calculateFinalPrice;
