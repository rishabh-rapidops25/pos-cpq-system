import { PricingOption } from "../models/PricingOption";

// Helper function to calculate total price for a category (color, mount, or material)
const calculateTotalPrice = async (
  selectedItems: { name: string; price?: number }[],
  type: string
): Promise<number> => {
  let totalPrice = 0;

  // Extract names from selected items
  const itemNames = selectedItems.map((item) => item.name);

  // Fetch pricing data from DB
  const pricingData = await PricingOption.find({
    type,
    name: { $in: itemNames },
  });

  // Combine selected item prices (if provided) and database prices
  selectedItems.forEach(({ name, price }) => {
    const dbPrice = pricingData.find((item) => item.name === name)?.price || 0;
    totalPrice += price ?? dbPrice; // Use provided price, otherwise use DB price
  });

  return totalPrice;
};
export const calculatePdfFinalPrice = async (
  basePrice: number,
  selectedColors: { colorCode: string; price?: number }[],
  selectedMounts: { mountType: string; price?: number }[],
  selectedMaterials: { materialType: string; price?: number }[]
): Promise<number> => {
  // Calculate total price for each category in parallel
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

  // Calculate final price
  const finalPrice =
    basePrice + totalColorPrice + totalMountPrice + totalMaterialPrice;
  return finalPrice;
};
