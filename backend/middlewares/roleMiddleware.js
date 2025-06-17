const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ Message: "Forbidden" });
        }
        next();
    }
}

export default roleMiddleware;