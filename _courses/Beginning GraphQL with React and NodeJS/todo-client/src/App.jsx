import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import TodoList from "./components/TodoList";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/graphql" }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Todo App</h1>
        <TodoList />
      </div>
    </ApolloProvider>
  );
}
export default App;
