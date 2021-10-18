import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "bmgrwyphluuvad",
  password: "bc89c3886e17d9cbc176b335c8b6c92a6327e3e7e636c6b54197abe089c352eb",
  database: "dakaih9pj5nl7c",
  port: 5432,
  host: "ec2-54-154-101-45.eu-west-1.compute.amazonaws.com",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// try {
//     await sequelize.authenticate();
//     console.log("okkkk");
//   } catch (error) {
//     console.error(error);
//   }
