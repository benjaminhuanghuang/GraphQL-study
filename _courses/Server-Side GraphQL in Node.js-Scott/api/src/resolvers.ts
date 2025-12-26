export default {
  Query: {},
  Mutation: {},
  Pet: {
    img(pet: { type: string }) {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
  },
  User: {},
};
