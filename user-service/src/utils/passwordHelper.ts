// src/utils/passwordHelper.ts
import bcrypt from "bcryptjs";

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// Function to compare a password with the hashed one
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
