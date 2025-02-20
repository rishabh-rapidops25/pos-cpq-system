import { logger } from "shared-constants";
import { PricingOption } from "../models/PricingOption";

export const savePricingOptions = async (
  options: {
    colorCode?: string;
    mountType?: string;
    materialType?: string;
    price?: number;
  }[],
  type: "color" | "mount" | "material",
  productId: string
) => {
  for (const option of options) {
    const name =
      type === "color"
        ? option.colorCode
        : type === "mount"
        ? option.mountType
        : option.materialType;

    if (!name) continue; // Skip if no name

    const existingOption = await PricingOption.findOne({
      type,
      name,
      product: productId,
    });

    if (!existingOption) {
      await new PricingOption({
        type,
        name,
        price: option.price || 0,
        product: productId, // Associate pricing option with the product
      }).save();
    }
    logger.info("Product configurations saved in pricing options");
  }
};

// Helper function to format price-related arrays
export const formatPrices = (
  items: Array<{ price?: number; [key: string]: any }>,
  key: string
) => {
  return items.map((item) => ({
    [key]: item[key],
    price: item.price || 0,
    colorCode: item.colorCode || "",
    mountType: item.mountType || "",
    materialType: item.materialType || "",
  }));
};
