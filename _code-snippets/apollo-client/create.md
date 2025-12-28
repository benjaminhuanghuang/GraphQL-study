# Create

```js
import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

// AddSong names the mutation operation for the client,
// while addSong is the actual server mutation being executed.
const ADD_SONG = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;

const SongCreate = () => {
  const [title, setTitle] = useState("");
  // useMutation turns the GraphQL document into a callable function
  const [addSong] = useMutation(ADD_SONG);

  const handleSubmit = (e) => {
    e.preventDefault();

    addSong({
      variables: { title },
    });

    setTitle("");
  };

  return (
    <div>
      <h3>Create a New Song</h3>
      <form onSubmit={handleSubmit}>
        <label>Song Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default SongCreate;
```
