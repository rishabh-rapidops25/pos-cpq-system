export const calculateFinalPrice = (
  price: number,
  selectedOptions: Record<string, string[]>,
  pricingRules: Record<string, Record<string, number>>
): number => {
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
