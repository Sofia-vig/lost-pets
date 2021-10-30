import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "tetmnhmarahgai",
  password: "c5a173b77a5ef1d9df69a586239935282dbe7a575e31dac9c97116ef986c6e5b",
  database: "ddsfh1g5pis9pl",
  port: 5432,
  host: "ec2-44-199-158-170.compute-1.amazonaws.com",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
