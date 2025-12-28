import { useState } from "react";

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onSubmit = () => {
    props.onSubmit(email, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="input-field">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {props.errors.map((err) => (
            <div key={err} style={{ color: "red" }}>
              {err}
            </div>
          ))}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
