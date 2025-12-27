import { buildSchema } from "graphql";

const schema = buildSchema(`   
  type Song {
    id: ID!
    title: String
    lyrics: [Lyric]
  }

  type Lyric {
    id: ID!
    content: String
    likes: Int
    song: Song
  }

  type Mutation {
    addSong(title: String!): Song
    addLyricToSong(content: String!, songId: ID!): Song
    likeLyric(id: ID!): Lyric
    deleteSong(id: ID!): Song
  }

  type Query {
    songs: [Song]
    song(id: ID!): Song
    lyrics: [Lyric]
    lyric(id: ID!): Lyric
  }

  type Mutation {
    addSong(title: String!): Song
    addLyricToSong(content: String!, songId: ID!): Song
    likeLyric(id: ID!): Lyric
    deleteSong(id: ID!): Song
  }

  type Query {
    songs: [Song]
    song(id: ID!): Song
    lyrics: [Lyric]
    lyric(id: ID!): Lyric
  }

    schema {
        query: Query
        mutation: Mutation
    }
`);

export default schema;
