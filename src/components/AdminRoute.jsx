import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  // NOT LOGGED IN
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // NOT ADMIN
  if (!userInfo.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminRoute;