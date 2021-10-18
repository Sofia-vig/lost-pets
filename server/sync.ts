import { User } from "./models";

User.sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
});
