import { Link, useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export const SONG = gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;

const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(SONG, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.song.title}</h2>
    </div>
  );
};

export default SongDetail;
