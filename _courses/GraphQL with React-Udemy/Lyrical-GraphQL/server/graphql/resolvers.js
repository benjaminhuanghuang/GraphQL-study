import Lyric from "../models/lyric.js";
import Song from "../models/song.js";

const resolvers = {
  addSong: ({ title }) => {
    return new Song({ title }).save();
  },
  addLyricToSong: ({ content, songId }) => {
    return Song.addLyric(songId, content);
  },
  likeLyric: ({ id }) => {
    return Lyric.like(id);
  },
  deleteSong: ({ id }) => {
    return Song.findByIdAndRemove(id);
  },
};
export default resolvers;
