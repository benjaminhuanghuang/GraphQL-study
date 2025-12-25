# GraphQL Todo API

```sh
npm i express express-graphql graphql cors
npm i mongoose
npm i -D nodemon
```

## Query

```graphql
{
  todos {
    id
    title
    completed
  }
}

{
  todo(id: "1") {
    id
    title
    completed
  }
}

mutation {
  addTodo(title: "write graphql book", completed: false) {
    id
    title
    completed
  }
}

mutation {
  deleteTodo(id: "63cf2f87ba6f07707d1f8775") {
    id
    title
    completed
  }
}

mutation {
  updateTodo(id: "63cf2fdcff71b20840649061", title: "edit graphql article") {
    id
    title
    completed
  }
}
```
