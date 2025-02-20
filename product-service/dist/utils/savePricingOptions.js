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
exports.savePricingOptions = void 0;
const PricingOption_1 = require("../models/PricingOption");
const savePricingOptions = (options, type) => __awaiter(void 0, void 0, void 0, function* () {
    for (const option of options) {
        const name = type === "color"
            ? option.colorCode
            : type === "mount"
                ? option.mountType
                : option.materialType;
        if (!name)
            continue; // Skip if no name
        const existingOption = yield PricingOption_1.PricingOption.findOne({ type, name });
        if (!existingOption) {
            yield new PricingOption_1.PricingOption({
                type,
                name,
                price: option.price || 0,
            }).save();
        }
    }
});
exports.savePricingOptions = savePricingOptions;
