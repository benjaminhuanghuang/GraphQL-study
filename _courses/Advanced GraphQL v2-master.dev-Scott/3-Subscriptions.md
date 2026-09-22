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

## Adding Subscriptions Exercise

## Adding Subscriptions Solution
