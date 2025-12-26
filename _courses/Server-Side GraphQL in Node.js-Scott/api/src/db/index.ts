import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import createPetModel from "./pet.js";
import createUserModel from "./user.js";

const adapter = new FileSync("api/src/db/db.json");
const db = low(adapter);

export default {
  models: {
    Pet: createPetModel(db),
    User: createUserModel(db),
  },
  db,
};
