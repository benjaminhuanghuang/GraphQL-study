import { gql } from "@apollo/client";

client
  .query({
    query: gql`
      {
        posts {
          id
          text
          user {
            avatar
            username
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));
