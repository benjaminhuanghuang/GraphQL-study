import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});

UserSchema.pre("save", async function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        else resolve(salt);
      });
    });

    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });

    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err);
      else resolve(isMatch);
    });
  });
};

export default mongoose.model("user", UserSchema);
