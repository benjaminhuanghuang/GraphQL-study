export default {
  Query: {
    pets(_: any, { input }: any, { models }: any) {
      return models.Pet.findMany(input || {});
    },
    pet(_: any, { id }: any, { models }: any) {
      return models.Pet.findOne({ id });
    },
    user(_: any, __: any, { models }: any) {
      return models.User.findOne();
    },
  },
  Mutation: {
    addPet(_: any, { input }: any, { models, user }: any) {
      const pet = models.Pet.create({ ...input, user: user.id });
      return pet;
    },
  },
  Pet: {
    owner(pet: any, _: any, { models }: any) {
      return models.User.findOne({ id: pet.user });
    },
    img(pet: any) {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
  },
  User: {
    pets(user: any, _: any, { models }: any) {
      return models.Pet.findMany({ user: user.id });
    },
  },
};
