import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const token = localStorage.getItem("token");
  // let decoded = {};
  // if (token && token !== "undefined") {
  //   decoded = jwtDecode(token);
  //   if (decoded.exp < Date.now() / 1000) {
  //     localStorage.removeItem("token");
  //     return <Navigate to="/login" />;
  //   }
  return <Outlet />;
  // }
  // return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
