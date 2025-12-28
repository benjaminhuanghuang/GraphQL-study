import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {data.songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
      <Link to="/songs/new">Add a New Song</Link>
    </div>
  );
};

export default SongList;
