//Express
import * as express from "express";
import * as cors from "cors";
import * as path from "path";

//Send grid
import { sgMail } from "./lib/sendgrid";

//Lodash
import { capitalize } from "lodash";

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

//cuando una pérsona reporta que vio una mascota y se manda mail de notificacion
app.post("/pets/report", async (req, res) => {
  const { reporter_name, phone_number, message, petId, userId } = req.body;
  const newReport = await reportController.reportPet(req.body);
  const user = await userController.findById(userId);
  const pet = await petController.getPetById(petId);
  const email = user.get("email");
  const name = pet.get("name");

  const msg = {
    to: email,
    from: "sofiavign@gmail.com",
    subject: `Una persona vio a ${capitalize(name)}!!!`,
    text: `Alguien vio a tu mascota perdida`,
    html: `<h1>${capitalize(reporter_name)} vio a tu mascota!</h1>
          <h3>Mensaje: ${message}</h3>
          <p>Te dejamos su numero de telefono para que te comuniques:</p>
          <h2>${phone_number}</h2>
          <p>Lost-Pets</p>    `,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  res.json(newReport);
});

app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
