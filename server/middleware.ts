import * as jwt from "jsonwebtoken";

const SECRET = "sofaa";

export const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (e) {
    res.status(401).json(e);
  }
};
