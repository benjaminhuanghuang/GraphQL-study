import Lyric from "../models/lyric.js";
import Song from "../models/song.js";

const resolvers = {
  Query: {
    songs: async () => {
      return await Song.find({});
    },
    song: async (_, { id }) => {
      return await Song.findById(id);
    },
    lyrics: async () => {
      return await Lyric.find({});
    },
    lyric: async (_, { id }) => {
      return await Lyric.findById(id);
    },
  },
  Mutation: {
    addSong: async (_, { title }) => {
      return await new Song({ title }).save();
    },
    addLyricToSong: async (_, { content, songId }) => {
      return await Song.addLyric(songId, content);
    },
    likeLyric: async (_, { id }) => {
      return await Lyric.like(id);
    },
    deleteSong: async (_, { id }) => {
      return await Song.findByIdAndDelete(id);
    },
  },
  Song: {
    lyrics: async (song) => {
      // If lyrics are already populated or it's an array of IDs, populate them
      if (
        song.lyrics &&
        song.lyrics.length > 0 &&
        typeof song.lyrics[0] === "string"
      ) {
        const populated = await song.populate("lyrics");
        return populated.lyrics;
      }
      // Return the lyrics array (could be empty or already populated)
      return song.lyrics || [];
    },
  },
  Lyric: {
    song: async (lyric) => {
      return await lyric.populate("song");
    },
  },
};
export default resolvers;
