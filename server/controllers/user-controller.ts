import { User } from "../models/";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
const SECRET = "sofaa";

const hash = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

type UserData = { email: string; password: string; name: string };

export class UserController {
  model;
  constructor() {
    this.model = User;
  }
  //Crea un user
  async createUser(data: UserData) {
    return this.model.create(data);
  }
  //Busca si existe un usuario con ese email
  async getUserByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }
  //Login con email y contraseña
  async getToken(email: string, password: string) {
    const user = await this.model.findOne({
      where: { email, password: hash(password) },
    });
    if (user) {
      return jwt.sign({ id: user?.get("user_id") }, SECRET);
    } else {
      return { error: "email or password incorrect" };
    }
  }
  //Devuelve un user por su id
  async getUser(id: number) {
    return this.model.findOne({ where: { id } });
  }
}
