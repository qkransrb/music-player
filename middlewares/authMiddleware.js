const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (
      bearerToken &&
      bearerToken.startsWith("Bearer") &&
      bearerToken.split(" ").length === 2
    ) {
      const token = bearerToken.substring(7);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = payload.userId;
      next();
    } else {
      return res.status(401).json({ message: "Not Authenticated" });
    }
  } catch (error) {
    console.error(`authMiddleware - ${error}`);
    return res.status(401).json({ message: error.message });
  }
};
