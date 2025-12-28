import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle lyric submission
    const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG);
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
      <button type="submit">Add Lyric</button>
    </form>
  );
};

export default LyricCreate;
