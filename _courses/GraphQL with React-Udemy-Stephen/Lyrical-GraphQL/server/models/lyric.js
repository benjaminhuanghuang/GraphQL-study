import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: "song",
  },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

LyricSchema.statics.like = function (id) {
  return this.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
};

export default mongoose.model("lyric", LyricSchema);
