import { ApolloError } from "apollo-boost";
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { RouteChildrenProps } from "react-router-dom";
import { SIGN_UP_USER } from "../../mutations/signupUser";

const Signup: React.FC<RouteChildrenProps> = props => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<ApolloError | null>(null);
  const [signUpUser, { data }] = useMutation(SIGN_UP_USER, {
    onError: e => setError(e),
    onCompleted: dat => {
      console.log(dat);
      props.history.push("/");
    }
  });
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username.trim().length !== 0 &&
      email.trim().length !== 0 &&
      password.trim().length > 5 &&
      password === confirmPassword
    ) {
      signUpUser({ variables: { username, email, password } });
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
        {error &&
          error.graphQLErrors.map(e => <p key={e.message}>{e.message}</p>)}
      </form>
    </div>
  );
};

export default Signup;
