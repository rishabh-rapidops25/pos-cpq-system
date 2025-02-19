// export const calculateFinalPrice = (
//   price: number,
//   selectedOptions: Record<string, string[]>,
//   pricingRules: Record<string, Record<string, number>>
// ): number => {
//   let finalPrice = price;

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

import { PricingOption } from "../models/PricingOption";
export const calculateFinalPrice = async (
  basePrice: number,
  selectedColors: string[],
  selectedMounts: string[],
  selectedMaterials: string[]
): Promise<number> => {
  let finalPrice = basePrice;

  const selectedOptions = [
    ...selectedColors,
    ...selectedMounts,
    ...selectedMaterials,
  ];

  // Fetch predefined prices from the database
  const pricingData = await PricingOption.find({
    name: { $in: selectedOptions },
  });

  // Add the additional costs
  pricingData.forEach((option) => {
    finalPrice += option.price;
  });

  return finalPrice;
};
