# Subscriptions

## Real-time Subscriptions

- Subscriptions - A well supported GraphQL operation that's useful for notifying clients of events
- Live Queries - Client side implementation to be notified when data changes

### Subscriptions vs Live Queries

Subscriptions

- Part of the spec
- Event observation
- Great support

Live Queries

- Experimental
- Data observation
- Support is getting there

Both

- Flexible transports and protocols

## Adding Subscriptions

- Subscriptions must be added to your Schema like Queries and Mutations
- Setup PubSub protocol server side
- Create Subscription event resolvers
- Add any needed authentication and context
- Client side setup

```ts
import { PubSub } from "graphql-subscriptions";

const NEW_POST = "NEW_POST";
const pubSub = new PubSub();


createPost(
    _: unknown,
    { input }: { input: Record<string, unknown> },
    { user, models }: Context,
) {
    const post = models.Post.createOne({ ...input, author: user!.id });
    pubSub.publish(NEW_POST, { newPost: post });
    return post;
},


Subscription: {
    newPost: {
        subscribe: () => pubSub.asyncIterableIterator(NEW_POST),
    },
},

```

## Adding Subscriptions Exercise

## Adding Subscriptions Solution
