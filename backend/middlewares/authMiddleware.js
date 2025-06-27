import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, ENV.JWT_SECRET, (err, decodedValue) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized access" });
      } else {
        next();
      }
    });
  } else {
    return res.status(400).json({ error: "token need to be provided" });
  }
};

export default authMiddleware;
