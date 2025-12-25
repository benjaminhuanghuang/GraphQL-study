import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($title: String!, $completed: Boolean!) {
    addTodo(title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

const TodoList = () => {
  const [title, setTitle] = useState("");
  const { loading, error, data } = useQuery(GET_TODOS);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  const [deleteTodo] = useMutation(DELETE_TODO);
  const [addTodo] = useMutation(ADD_TODO, {
    variables: { title, completed },
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const markTodo = (id) => {
    toggleTodo({
      variables: { id: id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") return alert("Please fill in todo title");
    addTodo();
    setTitle("");
  };

  const removeTodo = (id) => {
    deleteTodo({
      variables: { id: id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {data.todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>
                <FaEdit />
              </td>
              <td>
                <FaTrash onClick={() => removeTodo(todo.id)} />
              </td>
              <td>
                <MdDone />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
