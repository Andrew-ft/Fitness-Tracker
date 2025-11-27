import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const maxAge = 3 * 24 * 60 * 60;
export default function createToken(userId, role) {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    { userId, role },
    ENV.JWT_SECRET,
    { expiresIn: maxAge }
  )
}