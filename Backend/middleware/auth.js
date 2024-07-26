const { verifyToken } = require("../helpers/helper");

const Middleware = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);
    if (payload) {
      req.user = payload; // Optionally attach payload to request
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Middleware;
