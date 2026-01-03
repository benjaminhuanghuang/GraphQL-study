function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_LINK");
}

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

export const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => {
    return payload;
  },
};
