import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const PrivateRoute = ({ type, children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  }

  // if (loading) {
  //   return <Loading></Loading>;
  // }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
