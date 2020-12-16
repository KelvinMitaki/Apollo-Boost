import React from "react";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { User } from "../interfaces/User";
import { GET_CURRENT_USER } from "../queries/getCurrentUser";

const withAuth = (WrappedComponent: React.FC) => {
  const Component: React.FC = props => {
    const { data, loading } = useQuery<{
      getCurrentUser: User | null;
    }>(GET_CURRENT_USER, {
      onError: err => console.log(err),
      fetchPolicy: "network-only"
    });
    if (loading) {
      return null;
    }
    if (!data?.getCurrentUser) {
      return <Redirect to="/signin" />;
    }
    return (
      <UserContext.Provider value={data.getCurrentUser}>
        <WrappedComponent {...props} />;
      </UserContext.Provider>
    );
  };
  return Component;
};

export default withAuth;
