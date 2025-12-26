import { nanoid } from "nanoid";

interface Pet {
  id: string;
  createdAt: number;
  [key: string]: any;
}

interface PetFilter {
  [key: string]: any;
}

interface Database {
  get(key: string): any;
}

const createPetModel = (db: Database) => {
  return {
    findMany(filter: PetFilter) {
      return db.get("pet").filter(filter).value();
    },

    findOne(filter: PetFilter) {
      return db.get("pet").find(filter).value();
    },

    create(pet: Omit<Pet, "id" | "createdAt">) {
      const newPet: Pet = { id: nanoid(), createdAt: Date.now(), ...pet };

      db.get("pet").push(newPet).write();

      return newPet;
    },
  };
};

export default createPetModel;
