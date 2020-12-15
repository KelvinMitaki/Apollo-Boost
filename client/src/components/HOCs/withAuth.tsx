import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const withAuth = (WrappedComponent: React.FC) => {
  const Component: React.FC = props => {
    const user = useContext(UserContext);
    console.log(user);
    if (!user) {
      return <Redirect to="/signin" />;
    }
    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withAuth;
