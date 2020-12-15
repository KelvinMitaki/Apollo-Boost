import React from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const Component: React.FC = props => {
    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withAuth;
