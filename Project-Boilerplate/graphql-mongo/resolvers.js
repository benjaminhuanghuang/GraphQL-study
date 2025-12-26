import { Friends } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    createFriend: ({ input }) => {
      const newFriend = new Friends({
        name: input.name,
      });
      newFriend.id = newFriend._id;
      return new Promise((resolve, object) => {
        newFriend.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newFriend);
          }
        });
      });
    },
    updateFriend: (root, { input }) => {
      return new Promise((resolve, object) => {
        Friends.findOneAndUpdate(
          { _id: input.id },
          input,
          {
            new: true,
          },
          (err, friend) => {
            if (err) {
              reject(err);
            } else {
              resolve(friend);
            }
          }
        ); 
      });
    },
    deleteFriend:(root, { input }) => {
      return new Promise((resolve, object) => {
        Friends.remove(
          { _id: input.id },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve("Successfully deleted.");
            }
          }
        ); 
      });
    },
  },
};
