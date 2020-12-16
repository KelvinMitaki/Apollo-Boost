import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import "./App.css";
import { FETCH_ALL_CATEGORIES } from "../queries/fetchAllCategories";
import withAuth from "../HOCs/withAuth";
import { UserContext } from "../context/UserContext";

const App = () => {
  const { data, error, loading } = useQuery(FETCH_ALL_CATEGORIES);
  const user = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </div>
  );
};

export default withAuth(App);
