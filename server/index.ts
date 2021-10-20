//Express
import * as express from "express";
import * as cors from "cors";

const PORT = process.env.PORT || 4008;

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json("ok");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
