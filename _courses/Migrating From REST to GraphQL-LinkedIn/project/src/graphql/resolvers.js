import { Contact } from "../models/Contact.js";

const resolvers = {
  Query: {
    getContacts: () => {
      return Contact.find();
    },
    getOneContact: async (root, { id }) => {
      try {
        const contact = await Contact.findById(id);
        return contact;
      } catch (err) {
        throw new Error("Error fetching contact: " + err.message);
      }
    },
  },
  Mutation: {
    createContact: async (root, { input }) => {
      const newContact = new Contact({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        company: input.company,
      });

      newContact.id = newContact._id;

      try {
        await newContact.save();
        return newContact;
      } catch (err) {
        throw new Error("Error saving contact: " + err.message);
      }
    },
    updateContact: async (root, { input }) => {
      try {
        const updatedContact = await Contact.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true }
        );
        return updatedContact;
      } catch (err) {
        throw new Error("Error updating contact: " + err.message);
      }
    },
  },
};

export default resolvers;
