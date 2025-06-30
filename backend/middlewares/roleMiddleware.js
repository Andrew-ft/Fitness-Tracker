const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ error: "Forbidden. Insufficient role." });
    }
    next();
  };
};

export default roleMiddleware;
