import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt ||
      req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = {
        id: decoded.userId,
        role: decoded.role,
      };

      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal authentication error" });
  }
};

