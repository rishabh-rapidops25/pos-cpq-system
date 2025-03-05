import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

// Function to generate a JWT token
export const generateToken = (
  user: JwtPayload,
  secret: string,
  expiresIn: string | number = "24h"
): string => {
  // Correct way to pass the options object with 'expiresIn'
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name }, // Payload
    secret, // Secret key
    options // Options
  );
  return token;
};

// Function to verify a JWT token
export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null; // Return null if the token is invalid or expired
  }
};
