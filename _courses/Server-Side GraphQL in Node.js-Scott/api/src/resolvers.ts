import User from "./models/user";
import Pet from "./models/pet";

export default {
  Query: {
    pets: async (_: any, { input }: any) => {
      return await Pet.find(input || {});
    },

    pet: async (_: any, { id }: any) => {
      return await Pet.findById(id);
    },

    user: async (_: any, { id }: any) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    addPet: async (_: any, { input }: any, { user }: any) => {
      const pet = await Pet.create({ ...input, owner: user._id });
      return pet;
    },
  },

  Pet: {
    owner: async (pet: any) => {
      return await User.findById(pet.owner);
    },
    img: (pet: any) => {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
  },

  User: {
    pets: async (user: any) => {
      return await Pet.find({ owner: user._id });
    },
  },
};
