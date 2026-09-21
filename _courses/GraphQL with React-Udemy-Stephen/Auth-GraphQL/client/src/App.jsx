import { Routes, Route } from "react-router-dom";
//
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

export default App;
