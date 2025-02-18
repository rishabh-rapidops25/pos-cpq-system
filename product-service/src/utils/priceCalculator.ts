export const calculateFinalPrice = (
  basePrice: number,
  colors: string[],
  mounts: string[],
  materials: string[]
): number => {
  let finalPrice = basePrice;

  // Example of pricing logic based on options
  if (colors.includes("red")) {
    finalPrice += 10; // Red color adds $10
  }

  if (mounts.includes("inside")) {
    finalPrice += 20; // Inside mount adds $20
  }

  if (materials.includes("wood")) {
    finalPrice += 30; // Wood material adds $30
  }

  // More pricing logic based on other options
  return finalPrice;
};
