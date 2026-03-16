import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const isAuthenticated = () => localStorage.getItem("Token") !== null;

  if (isAuthenticated()) {
    // Redirect logged-in users away from guest pages (e.g., login)
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render child routes for unauthenticated users
};

export default GuestRoute;
