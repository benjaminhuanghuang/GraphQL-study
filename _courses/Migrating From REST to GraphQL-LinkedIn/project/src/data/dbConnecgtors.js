export const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  email: {
    type: String,
  },
  company: {
    typeof: String,
  },
});

export const Contact = mongoose.model("Contact", ContactSchema);
