import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
const SECRET = "sofa-secreto-2";

export const getSHA256 = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch {}
};
