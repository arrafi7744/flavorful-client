import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import GlobalLoading from "../components/GlobalComponents/GlobalLoading/GlobalLoading";

const BuyerPrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (user && user.userType === 103) {
    return children;
  }

  if (loading) {
    return <GlobalLoading></GlobalLoading>;
  }

  return <Navigate to="/login"></Navigate>;
};

export default BuyerPrivateRoute;
