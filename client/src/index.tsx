import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat
} from "@apollo/client";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem("token") || ""}`
    }
  }));
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
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
