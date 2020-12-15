import { ApolloError } from "apollo-boost";
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { RouteChildrenProps } from "react-router-dom";
import { SIGN_IN_USER } from "../../mutations/signinUser";

const Signin: React.FC<RouteChildrenProps> = props => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ApolloError | null>(null);
  const [signinUser, { data }] = useMutation(SIGN_IN_USER, {
    onError: e => setError(e),
    onCompleted: dat => {
      console.log(dat);
      props.history.push("/");
    }
  });
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length !== 0 && password.trim().length > 5) {
      signinUser({ variables: { email, password } });
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form" onSubmit={onSubmit}>
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
        <button type="submit" className="button-primary">
          Submit
        </button>
        {error &&
          error.graphQLErrors.map(e => <p key={e.message}>{e.message}</p>)}
      </form>
    </div>
  );
};

export default Signin;
