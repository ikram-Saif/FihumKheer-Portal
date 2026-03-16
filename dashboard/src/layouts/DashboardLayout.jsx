import Nav from '../components/Navbar'
import Side from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function DashboardLayout() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(true);

  return (
    <>
   <div className="flex h-screen">
      {/* Sidebar */}
      <Side isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 lg:ml-0 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
         <Nav setIsSidebarOpen={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
   
    </>
  )
}

export default DashboardLayout