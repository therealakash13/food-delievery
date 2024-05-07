import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verified.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
