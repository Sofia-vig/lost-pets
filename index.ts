//Express
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

//Models
import { User, Pet, Report } from "./models";

//Controllers
import { UserController, PetController } from "./controllers";
const userController = new UserController();
const petController = new PetController();

//utils
import { authMiddleware } from "./lib/utils";

// import "./sync";

const PORT = process.env.PORT || 4008;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(express.static("dist"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/testt", (req, res) => {
  res.json({ ok: "true" });
});

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

//devuelve mi info y mis mascotas reportadas
app.get("/me", async (req, res) => {
  const userId = req._user.id;
  const me = await userController.getMe(userId);
  res.json(me);
});

//devuelve todas las mascotas reportadas que aun no fueron encontradas
app.get("/pets", async (req, res) => {
  const { allPets } = await petController.getAllPetsNotFounded();
  //mascotas cerca usar busqueda de algolia por _geoloc
  res.json({ allPets });
});

//crea una nueva mascota (reportar mi mascota perdida)
app.post("/pets", authMiddleware, async (req, res) => {
  const userId = req._user.id;
  const newPet = await petController.createPet(userId, req.body);
  res.json(newPet);
});

// actualizar mascota reportada
app.put("/pets/:petId", authMiddleware, async (req, res) => {
  const { petId } = req.params;
  await petController.updatePet(petId, req.body);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
