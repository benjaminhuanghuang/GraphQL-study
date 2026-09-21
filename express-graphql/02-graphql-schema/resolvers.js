import {Friend} from './dbConnectors'

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
    createFriend: (root, { input }) => {
      const newFriend = new Friend(input.name, input.gender);
      return new Promisse();     
    },
  },
};

