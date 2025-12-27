const typeDefs = `
    type Contact {
        id: ID
        firstName: String
        lastName: String
        email: String
        company: String
    }

    type Query {
        getContacts: [Contact]
        getOneContact(id: ID!): Contact
    }

    input ContactInput {
        id: ID
        firstName: String
        lastName: String
        email: String
        company: String
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(input: ContactInput): Contact
    }
`;

export default typeDefs;
