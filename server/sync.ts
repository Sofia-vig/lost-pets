import { User, Pet, Report } from "./models";

User.sequelize
  .sync({ force: true })
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
