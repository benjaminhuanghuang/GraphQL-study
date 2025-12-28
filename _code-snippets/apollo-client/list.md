# List

```js
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_SONGS = gql`
  {
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
    </div>
  );
};

export default SongList;
```
