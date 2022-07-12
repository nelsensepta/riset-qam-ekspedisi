import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
// import { Loader } from "./loader";
import { ThreeDots } from "react-loader-spinner";

export const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <ThreeDots color="#00BFFF" height={80} width={80} />,
  });

  return <Component />;
};
