
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStor";


const RoleRoute = ({roles}) => {
  const {userRole} = useAuthStore()  

 
   // If route requires roles and user doesn't match → block
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />; 
};

export default RoleRoute;
