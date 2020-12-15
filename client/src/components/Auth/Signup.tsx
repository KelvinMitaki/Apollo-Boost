import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { SIGN_UP_USER } from "../../mutations/signupUser";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signUpUser, { data }] = useMutation(SIGN_UP_USER, {
    onError: e => console.log(e)
  });
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpUser({ variables: { username, email, password } });
  };
  console.log(data);
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
      </form>
    </div>
  );
};

export default Signup;
