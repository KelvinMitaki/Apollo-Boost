import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const Root = () => {
  return (
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
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
