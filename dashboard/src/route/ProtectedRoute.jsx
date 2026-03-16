
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStor";




const ProtectedRoute = () => {
  const {token} = useAuthStore()  

  // authentication check
const isAuthenticated = () => {
  return token!= null; // Check if token exists
};

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />; // Redirect to login if not auth
  }

  return <Outlet />; 
};

export default ProtectedRoute;
