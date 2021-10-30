import { User, Pet, Report } from "./models";

User.sequelize
  .sync({ alter: true })
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
