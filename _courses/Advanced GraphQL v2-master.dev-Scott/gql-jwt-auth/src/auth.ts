import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const TOKEN_TTL = "7d";

export interface AuthUser {
  id: string;
}

export const createToken = (user: AuthUser): string =>
  jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_TTL });

export const getUserFromToken = (
  token?: string | null,
): AuthUser | null => {
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
};
