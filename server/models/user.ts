import { Model, DataTypes } from "sequelize";
import { sequelize } from "./db";

export class User extends Model {}
User.init(
  {
    fullname: DataTypes.STRING,
    bio: DataTypes.STRING,
    pictureURL: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
