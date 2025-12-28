import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

import AuthForm from "./AuthForm";

const SIGNUP_USER = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SignupForm = () => {
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  onSubmit = (email, password) => {
    signupUser({
      variables: { email, password },
    });
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignupForm;
