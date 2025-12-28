import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {data.songs.map((song) => (
          <li key={song.id}>
            {song.title}
            <i
              className="material-icons"
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() =>
                deleteSong({
                  variables: { id: song.id },
                  refetchQueries: [{ query: GET_SONGS }],
                })
              }
            >
              X
            </i>
          </li>
        ))}
      </ul>
      <Link to="/songs/new">Add a New Song</Link>
    </div>
  );
};

export default SongList;
