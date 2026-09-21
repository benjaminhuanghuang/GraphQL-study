import { buildSchema } from "graphql";

type Book = {
  id: string;
  title: string;
  author: string;
};

const books: Book[] = [
  { id: "1", title: "The Hobbit", author: "J. R. R. Tolkien" },
];

export const schema = buildSchema(/* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`);

export const rootValue = {
  books: () => books,
  addBook: ({ title, author }: { title: string; author: string }) => {
    const book = { id: String(books.length + 1), title, author };
    books.push(book);
    return book;
  },
};
