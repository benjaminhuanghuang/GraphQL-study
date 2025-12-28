import Lyric from "../models/lyric.js";
import Song from "../models/song.js";

const resolvers = {
  Query: {
    _empty: () => "GraphQL is running",
  },
};
export default resolvers;
