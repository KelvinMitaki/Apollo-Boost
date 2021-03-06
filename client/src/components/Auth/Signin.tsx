import { ApolloError } from "@apollo/client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SIGN_IN_USER } from "../../mutations/signinUser";
import withoutAuth from "../../HOCs/withoutAuth";

const Signin: React.FC<RouteComponentProps> = props => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ApolloError | null>(null);
  const [signinUser] = useMutation(SIGN_IN_USER, {
    onError: e => setError(e),
    onCompleted: dat => {
      localStorage.setItem("token", dat.signinUser.token);
      props.history.push("/");
    }
  });
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length !== 0 && password.trim().length > 5) {
      signinUser({
        variables: { email, password }
      });
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="App">
      <h2 className="App">Signin</h2>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          onFocus={() => error && setError(null)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          onFocus={() => error && setError(null)}
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

export default withRouter(withoutAuth(Signin));
