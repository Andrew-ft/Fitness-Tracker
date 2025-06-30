import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const maxAge = 3 * 24 * 60 * 60;
export default function createToken(id, role) {
  return jwt.sign({ id, role }, ENV.JWT_SECRET, { expiresIn: maxAge });
}