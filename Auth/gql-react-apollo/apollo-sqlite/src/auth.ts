import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const SALT_ROUNDS = 10;
const TOKEN_TTL = "7d";

export interface AppJwtPayload {
  sub: number;
  username: string;
}

export const hashPassword = (password: string) =>
  bcrypt.hash(password, SALT_ROUNDS);

export const verifyPassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const signToken = (payload: AppJwtPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });

export const verifyToken = (token: string): AppJwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as AppJwtPayload;
  } catch {
    return null;
  }
};
