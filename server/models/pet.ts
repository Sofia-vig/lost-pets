import { Model, DataTypes } from "sequelize";
import { sequelize } from "./db";

export class Pet extends Model {}
Pet.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    lastGeo_lat: DataTypes.FLOAT,
    lastGeo_lon: DataTypes.FLOAT,
    founded: DataTypes.BOOLEAN,
    userId: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
