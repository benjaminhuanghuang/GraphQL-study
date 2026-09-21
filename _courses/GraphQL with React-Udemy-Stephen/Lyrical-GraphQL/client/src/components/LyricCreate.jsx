import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState("");
  const [addLyricToSong, { data, loading, error }] =
    useMutation(ADD_LYRIC_TO_SONG);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addLyricToSong({
      variables: { content, songId },
    });

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Lyric</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter lyric content"
      />
      <button type="submit" onClick={handleSubmit} disabled={loading}>
        Add Lyric
      </button>
    </form>
  );
};

export default LyricCreate;
