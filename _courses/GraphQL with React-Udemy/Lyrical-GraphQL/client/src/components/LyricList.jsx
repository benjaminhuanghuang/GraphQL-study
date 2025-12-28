import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

const LyricList = ({ lyrics }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const onLike = (id, likes) => {
    likeLyric({
      variables: { id },
    });
  };

  return (
    <div className="lyric-list">
      <ul>
        {lyrics &&
          lyrics.map((lyric) => (
            <li key={lyric.id}>
              {lyric.content}
              <i
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => onLike(lyric.id, lyric.likes)}
              >
                👍
              </i>
              {lyric.likes}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LyricList;
