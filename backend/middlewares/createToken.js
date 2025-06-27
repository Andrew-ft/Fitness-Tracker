import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const maxAge = 3 * 24 * 60 * 60;
export default function createToken(id) {
  return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: maxAge });
}