// database
const friendDatabase = {};

class Friend {
  constructor(id, { name, gender }) {
    this.id = id;
    this.name = name;
    this.gender = gender;
  }
}

// resolver map
export const resolvers = {
  Query: {
    hello: () => "Hi, GraphQL",
    friend: () => {
      return { id: 1111, ddd: "ben" };
    },
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    createFriend: ({ input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDatabase[id] = input;
      return new Friend(id, input);
    },
  },
};

