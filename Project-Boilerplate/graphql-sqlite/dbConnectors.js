import Sequelize from "sequelize";

import _ from "lodash";
import casual from "casual";

const sequlize = new Sequelize("database", null, null, {
  dialect: "sqlite",
  storage: "./alien.sqlite",
});

export const Alines = sequlize.define("aliens", {
  name: { type: Sequelize.STRING },
});
