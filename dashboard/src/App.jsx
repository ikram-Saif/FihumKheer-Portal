import DashboardLayout from "./layouts/DashboardLayout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Volunteers from './pages/Volunteers';
import Donation from './pages/Donation';
import Event from './pages/Events';
import Users from './pages/Users'
import Team from './pages/Team'
import Sectors from './pages/Sectors'
import About from './pages/About'
import Projects from './pages/projects/Projects'
import ContactInfo from './pages/ContactInfo'
import RecentProject from './pages/RecentProject'
import Gallery from './pages/Gallery'
import Login from "./pages/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import GuestRoute from "./route/GuestRoute";
import RoleRoute from  "./route/RoleRoute"
import EditResource from "./pages/EditResource";
import { useVolunteersStore } from "./store/volunteersStor";
import { useEffect } from "react";
import { useDomainStore } from "./store/domainStore";
import AddResource from "./pages/AddResource";


function App() {

  const allRoles = ["admin","author"];
 const router = createBrowserRouter([
  {
    element: ( <ProtectedRoute> <RoleRoute roles={allRoles} /></ProtectedRoute> ) ,
    children:[
          {
            path: "/",
            element:  <DashboardLayout />,
            children: [
          { index: true, element: <Dashboard /> },
          { 
            path: "volunteers", 
            children: [
              { index: true, element: <Volunteers /> },
              { path: "add", element: <AddResource resource="volunteers" /> }, 
              { path: "edit/:id", element: <EditResource resource="volunteers" /> }, 
            ]
          },
          { path: "donation", element:  <Donation /> },
          { path: "events", element:<Event /> },
          { path: "users", element: (<RoleRoute roles={["admin"]}> <Users /></RoleRoute>) },
          { path: "team", element:(<RoleRoute roles={["admin"]}> <Team /> </RoleRoute>)},
          { path: "sectors", element:<Sectors /> },
          { path: "about", element:<About /> },
          { path: "projects",  element: (<RoleRoute roles={allRoles}> <Projects /> </RoleRoute>),
            children:[
                    { index: true,element: <Projects/>}, 
                    { path: "add",element: <AddResource resource="projects" />},
                    { path: "edit/:id",element: <EditResource resource="projects" />}, 
                    { path: "recent", element: (<RoleRoute roles={["admin"]}><RecentProject /> </RoleRoute>) } ,
            ] 
          },
      
          { path: "contactInfo", element:<ContactInfo /> },
          { path: "gallery", element: <Gallery /> },
          { path: "unauthorized", element:<h1>🚫 Unauthorized</h1> },
        ]
      }
    ]
  },

  {
    element:<GuestRoute />,
    children:[
      {
         path:"/login",
         element:<Login />
      }
    ]
   
  }
]);


 const {volunteers,fetchAllVolunteers} = useVolunteersStore();
 const{domains , fetchAllDomains} = useDomainStore()

  useEffect(() => {
        fetchAllDomains()
    fetchAllVolunteers(); 

   
  }, []);

  return (
 
       <RouterProvider router={router} />

  )
}

export default App
