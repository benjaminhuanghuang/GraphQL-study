import React from "react";

const LyricList = ({ lyrics }) => {
  return (
    <div className="lyric-list">
      <ul>
        {lyrics &&
          lyrics.map((lyric) => <li key={lyric.id}>{lyric.content}</li>)}
      </ul>
    </div>
  );
};

export default LyricList;
