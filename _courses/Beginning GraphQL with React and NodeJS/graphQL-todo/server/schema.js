import { todos } from "./sampleData.js";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import Todo from "./models/todo.js";

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

// root query that represents all the possible entry points into the GraphQL API
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      // resolve function is used to determine what to return for the field.
      resolve(parent, args) {
        return Todo.find();
      },
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Todo.findById(args.id);
      },
    },
  },
});
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args) {
        const todo = new Todo({
          title: args.title,
          completed: false,
        });
        return todo.save();
      },
    },

    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Todo.findByIdAndRemove(args.id);
      },
    },

    updateTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(args.id, {
          $set: {
            title: args.title,
          },
        });
      },
    },
    toggleTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const todo = await Todo.findById(args.id);
        return Todo.findByIdAndUpdate(args.id, {
          $set: {
            completed: !todo.completed,
          },
        });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
