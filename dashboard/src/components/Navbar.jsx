import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  XIcon
} from "flowbite-react";
import { HiMenu , HiX ,HiBell, HiSun, HiMoon} from "react-icons/hi";
import {useState} from "react"


function Nav({ setIsSidebarOpen, isSidebarOpen }) {
   const [darkMode, setDarkMode] = useState(false);
  return (
 
       <Navbar fluid rounded className="bg-white border-b border-gray-100 p-4">
      <Button
          color="white"
          onClick={() => setIsSidebarOpen(true)}
          className={`bg-white lg:hidden ${isSidebarOpen ? "hidden" : "block"}`}
        >
          <HiMenu className="h-6 w-6 text-gray-500" />
        </Button>

        <div className="flex items-center gap-4 ml-auto md:order-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
        {darkMode ? (

          <HiSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <HiMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        )}
      </button>

      {/* Notification / Bell */}
      <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <HiBell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        {/* Notification Dot */}
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
      </button>
         
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
          
        >
         

          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-xs">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
  
        <NavbarToggle />
      </div>
 
    </Navbar>
  )
}

export default Nav