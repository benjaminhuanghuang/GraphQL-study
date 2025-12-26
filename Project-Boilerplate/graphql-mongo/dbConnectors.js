import mongoose from "mongoose";

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://root:root1234@cluster0.29z7w.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const friendSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
});

export const Friends = mongoose.model("friends", friendSchema);

