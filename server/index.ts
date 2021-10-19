//Express
import * as express from "express";
import * as cors from "cors";

//Lib
import { cloudinary } from "./lib/cloudinary";
import { index } from "./lib/algolia";

//Controllers
import {
  UserController,
  PetController,
  ReportController,
} from "./controllers/";

//Middleware
import { authMiddleware } from "./middleware";

//Secret
const SECRET = "sofaa";

const PORT = process.env.PORT || 4008;

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json("ok");
});

//signup
app.post("/auth", async (req, res) => {
  const { email, password, name } = req.body;
  const userController = new UserController();

  const user = await userController.createUser({ email, password, name });

  await index.saveObject({
    objectID: user.get("id"),
    name: user.get("nombre"),
    email: user.get("email"),
  });

  res.json(user);
});

//signin
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const userController = new UserController();

  //Si el mail no existe devuelve error
  const findUser = await userController.getUserByEmail(email);
  !findUser && res.status(400).json({ find: false });

  const resToken = await userController.getToken(email, password);

  res.json({ resToken });
});

app.get("/me", authMiddleware, async (req, res) => {
  const user = new UserController();
  const me = user.getUser(req._user.id);
  res.json(me);
});

//Crear un reporte
app.post("/report", async (req, res) => {
  const { reporter_name, phone_number, message, petId } = req.body;
  const report = new ReportController();
  const resCreate = await report.createReport({
    reporter_name,
    phone_number,
    message,
    petId,
  });

  res.json(resCreate);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
