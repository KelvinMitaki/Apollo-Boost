import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "react-apollo";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { User } from "../../interfaces/User";
import { GET_CURRENT_USER } from "../../queries/getCurrentUser";

const withAuth = (WrappedComponent: React.FC) => {
  const Component: React.FC = props => {
    const { data, loading } = useQuery<{
      getCurrentUser: User | null;
    }>(GET_CURRENT_USER, {
      onError: err => console.log(err),
      variables: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      },
      fetchPolicy: "cache-and-network"
    });
    useEffect(() => {}, []);
    if (loading) {
      return null;
    }
    console.log(localStorage.getItem("token"));
    console.log(data);
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
