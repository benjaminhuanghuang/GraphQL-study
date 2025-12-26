import mongoose from "mongoose";

export enum PET_TYPES {
  CAT = "CAT",
  DOG = "DOG",
}

const petSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: PET_TYPES,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt / updatedAt automatically
  }
);

export default mongoose.model("Pet", petSchema);
