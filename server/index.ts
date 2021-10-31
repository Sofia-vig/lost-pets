//Express
import * as express from "express";
import * as cors from "cors";
import * as path from "path";

//Enviroment
require("dotenv").config();

//Models
import { User, Pet, Report } from "./models";

//Controllers
import { UserController, PetController, ReportController } from "./controllers";
const userController = new UserController();
const petController = new PetController();
const reportController = new ReportController();

//Utils
import { authMiddleware } from "./lib/utils";

//Sync
// import "./sync";

const PORT = process.env.PORT || 4008;

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.get("/test", async (req, res) => {
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
  console.log("/me");

  const userId = req._user.id;
  const response = await userController.updateUser(userId, req.body);
  res.json(response);
});

//devuelve mi info y mis mascotas reportadas
app.get("/me", authMiddleware, async (req, res) => {
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

//devuelve mis mascotas reportadas
app.get("/me/pets", authMiddleware, async (req, res) => {
  const myPets = await petController.getPetsByUserId(req._user.id);
  res.json({ myPets });
});

//devuelve una mascota por su id
app.get("/pets/:petId", authMiddleware, async (req, res) => {
  const { petId } = req.params;
  const pet = await petController.getPetById(petId);
  res.json(pet);
});

//crea una nueva mascota (reportar mi mascota perdida)
app.post("/pets", authMiddleware, async (req, res) => {
  const userId = req._user.id;
  const newPet = await petController.createPet(userId, req.body);
  res.json(newPet);
});

// actualizar mascota reportada
app.put("/pets/:petId", async (req, res) => {
  const { petId } = req.params;
  await petController.updatePet(petId, req.body);
  res.json({ ok: true });
});

app.post("/pets/report", async (req, res) => {
  const newReport = await reportController.reportPet(req.body);
  res.json(newReport);
});

app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
