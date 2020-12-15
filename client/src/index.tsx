import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "react-apollo";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import { GET_CURRENT_USER } from "./queries/getCurrentUser";
import { User } from "./interfaces/User";
import { UserContext } from "./context/UserContext";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  headers: {
    authorization: localStorage.getItem("token") || ""
  }
});

const Root = () => {
  const { data, loading } = useQuery<{ getCurrentUser: User | null }>(
    GET_CURRENT_USER,
    {
      onError: err => console.log(err),
      variables: {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
    }
  );
  if (loading) {
    return null;
  }
  return (
    <Switch>
      <UserContext.Provider value={data?.getCurrentUser!}>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </UserContext.Provider>
      <Redirect to="/" />
    </Switch>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
