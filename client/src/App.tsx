import React from "react";
import { useQuery } from "react-apollo";
import "./App.css";
import { FETCH_ALL_CATEGORIES } from "./queries/fetchAllCategories";

function App() {
  const { data, error, loading } = useQuery(FETCH_ALL_CATEGORIES);
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
    </div>
  );
}

export default App;
