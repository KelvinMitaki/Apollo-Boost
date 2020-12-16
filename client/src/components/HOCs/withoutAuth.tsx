import React from "react";
import { useQuery } from "@apollo/client";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { User } from "../../interfaces/User";
import { GET_CURRENT_USER } from "../../queries/getCurrentUser";

const withoutAuth = (WrappedComponent: React.FC<RouteComponentProps>) => {
  const Component: React.FC<RouteComponentProps> = props => {
    const { data, loading } = useQuery<{ getCurrentUser: User | null }>(
      GET_CURRENT_USER,
      {
        onError: err => console.log(err),
        fetchPolicy: "network-only"
      }
    );
    if (loading) {
      return null;
    }
    if (data?.getCurrentUser) {
      return <Redirect to="/" />;
    }
    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withoutAuth;
