import Lyric from "../models/lyric.js";
import Song from "../models/song.js";

const resolvers = {
  Query: {
    songs: () => {
      return Song.find({});
    },
    song: (_, { id }) => {
      return Song.findById(id);
    },
    lyrics: () => {
      return Lyric.find({});
    },
    lyric: (_, { id }) => {
      return Lyric.findById(id);
    },
  },
  Mutation: {
    addSong: (_, { title }) => {
      return new Song({ title }).save();
    },
    addLyricToSong: (_, { content, songId }) => {
      return Song.addLyric(songId, content);
    },
    likeLyric: (_, { id }) => {
      return Lyric.like(id);
    },
    deleteSong: (_, { id }) => {
      return Song.findByIdAndRemove(id);
    },
  },
  Song: {
    lyrics: (song) => {
      return song.populate("lyrics");
    },
  },
  Lyric: {
    song: (lyric) => {
      return lyric.populate("song");
    },
  },
};
export default resolvers;
