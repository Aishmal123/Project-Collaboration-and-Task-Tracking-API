import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "9f3d8c1a7b2e4d6f8c0a1b2c3d4e5f6g7h8i9j0k";

    const decoded = jwt.verify(token, secret); // ← THIS LINE WAS MISSING

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;