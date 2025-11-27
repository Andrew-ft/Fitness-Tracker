import { authMiddleware } from "./authMiddleware.js";

export const memberMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== "MEMBER") {
      return res.status(403).json({ error: "Member access required" });
    }
    next();
  });
};
