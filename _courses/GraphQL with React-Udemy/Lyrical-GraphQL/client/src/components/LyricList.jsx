import React from "react";

const LyricList = ({ lyrics }) => {
  const onLike = (id, likes) => {
    // Placeholder for like functionality
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
                onClick={() => {}}
              >
                up
              </i>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LyricList;
