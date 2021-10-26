//Express
import * as express from "express";
import * as cors from "cors";

//Models
import { User, Pet, Report } from "./models";

//Controllers
import { UserController } from "./controllers";
const userController = new UserController();

//utils
import { authMiddleware } from "./lib/utils";

const PORT = process.env.PORT || 4008;

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  console.log(req._user);

  const allUsers = await User.findAll();

  const allPets = await Pet.findAll();

  const allReports = await Report.findAll();

  res.json({ allUsers, allReports, allPets });
});

//devuelve true si existe el mail
app.get("/exist", async (req, res) => {
  const { email } = req.query;
  const isFind = await userController.findByEmail(email);
  res.json({ find: isFind });
});

//signup
app.post("/auth", async (req, res) => {
  await userController.createUser(req.body);
  res.json({ ok: true });
});

//signin
app.post("/auth/token", async (req, res) => {
  const response = await userController.getToken(req.body);
  res.json(response);
});

//actualiza mi data
app.put("/me", authMiddleware, async (req, res) => {
  const userId = req._user.id;
  const response = await userController.updateUser(userId, req.body);
  res.json(response);
});

//devuelve mi info
app.get("/me", authMiddleware, async (req, res) => {
  const userId = req._user.id;
  const me = await userController.getMe(userId);
  res.json(me);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
