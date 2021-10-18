import * as express from "express";
import * as path from "path";
import { cloudinary } from "./lib/cloudinary";
import * as cors from "cors";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

const hash = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

const app = express();
const PORT = process.env.PORT || 4008;

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json("ok");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
