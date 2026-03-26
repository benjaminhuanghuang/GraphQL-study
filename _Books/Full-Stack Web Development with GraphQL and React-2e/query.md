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
  addPost(
    post: { text: "Hello world from GraphQL" }
    user: { username: "alice", avatar: "https://example.com/avatar.png" }
  ) {
    id
    text
    user {
      username
      avatar
    }
  }
}
```
