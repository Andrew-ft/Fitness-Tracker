import { authMiddleware } from "./authMiddleware.js";

export const trainerMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== "TRAINER") {
      return res.status(403).json({ error: "Trainer access required" });
    }
    next();
  });
};
