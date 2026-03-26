# Query

```json
// Get posts
query {
  posts {
    id
    text
    user { username avatar }
  }
}


// Add post
mutation AddPost {
  addPost(post: { text: "Hello world from GraphQL" }) {
    id
    text
    user {
      username
      avatar
    }
  }
}

mutation {
  deletePost(postId: 3) {
    success
  }
}

```
