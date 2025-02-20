import { PricingOption } from "../models/PricingOption";

// Helper function to calculate total price for a category (color, mount, or material)
const calculateTotalPrice = async (
  selectedItems: { name: string; price?: number }[],
  type: string
): Promise<number> => {
  let totalPrice = 0;

  // Extract the names and find the pricing data in parallel
  const itemNames = selectedItems.map((item) => item.name);
  const pricingData = await PricingOption.find({
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
};

export const calculateFinalPrice = async (
  basePrice: number,
  selectedColors: { colorCode: string; price?: number }[],
  selectedMounts: { mountType: string; price?: number }[],
  selectedMaterials: { materialType: string; price?: number }[]
): Promise<number> => {
  // Calculate the price for each category (color, mount, material) in parallel
  const [totalColorPrice, totalMountPrice, totalMaterialPrice] =
    await Promise.all([
      calculateTotalPrice(
        selectedColors.map(({ colorCode, price }) => ({
          name: colorCode,
          price,
        })),
        "color"
      ),
      calculateTotalPrice(
        selectedMounts.map(({ mountType, price }) => ({
          name: mountType,
          price,
        })),
        "mount"
      ),
      calculateTotalPrice(
        selectedMaterials.map(({ materialType, price }) => ({
          name: materialType,
          price,
        })),
        "material"
      ),
    ]);

  // Add all the additional prices to the final price
  const finalPrice =
    basePrice + totalColorPrice + totalMountPrice + totalMaterialPrice;
  console.log(finalPrice, "Calculate rpice");
  return finalPrice;
};

export const calculateFinalPrices = async (
  basePrice: number,
  selectedColors: string[],
  selectedMounts: string[],
  selectedMaterials: string[]
): Promise<number> => {
  // Helper function to fetch prices from DB
  const fetchPrices = async (items: string[], type: string) => {
    const pricingData = await PricingOption.find({
      type,
      name: { $in: items },
    });
    return pricingData.reduce((total, item) => total + (item.price || 0), 0);
  };

  // Fetch total prices for each category in parallel
  const [totalColorPrice, totalMountPrice, totalMaterialPrice] =
    await Promise.all([
      fetchPrices(selectedColors, "color"),
      fetchPrices(selectedMounts, "mount"),
      fetchPrices(selectedMaterials, "material"),
    ]);

  return basePrice + totalColorPrice + totalMountPrice + totalMaterialPrice;
};
