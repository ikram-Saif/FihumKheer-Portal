
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
  HiHome,        // Dashboard
  HiCollection,  // Projects
  HiViewGrid,    // Sectors
  HiUsers,       // Volunteers
  HiCurrencyDollar, // Donation
  HiCalendar,    // Events
  HiInformationCircle, // About Page
  HiMail,        // Contact Info
  HiUserGroup,   // Team Members
  HiPhotograph,  // Gallery
  HiUserCircle, // Users
  HiX, // Close icon
} from "react-icons/hi";
import Logo from "./Logo";
import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStor";



function Side({ isSidebarOpen, setIsSidebarOpen }) {

  const { userRole } = useAuthStore()
  const sidebarItems = [
    { href: "/", icon: HiHome, label: "Dashboard", roles: ["admin", "author"] },

    {
      href: "/projects", icon: HiCollection, label: "Projects", roles: ["admin", "author"],
      children: [
        { href: "/", label: "All Projects", roles: ["admin", "author"] },
        { href: "/recent", label: "Recent Project", roles: ["admin"] }
      ]
    },
    { href: "/sectors", icon: HiViewGrid, label: "Sectors", roles: ["admin", "author"] },
    { href: "/volunteers", icon: HiUsers, label: "Volunteers", roles: ["admin", "author"] },
    { href: "/donation", icon: HiCurrencyDollar, label: "Donation", roles: ["admin", "author"] },
    { href: "/events", icon: HiCalendar, label: "Events", roles: ["author", "admin"] },
    { href: "/about", icon: HiInformationCircle, label: "About Page", roles: ["admin", "author"] },
    { href: "/contactInfo", icon: HiMail, label: "Contact Info", roles: ["admin"] },
    { href: "/team", icon: HiUserGroup, label: "Team Members", roles: ["admin", "author"] },
    { href: "/gallery", icon: HiPhotograph, label: "Gallery", roles: ["admin", "author"] },
    { href: "/users", icon: HiUserCircle, label: "Users", roles: ["admin"] }
  ];
  // filter the parent , map result return ne object of item and replace items.children with filterd one 
  const sidebarRoleItems = sidebarItems
    .filter(item => !item.roles || item.roles.includes(userRole))
    .map(item => ({
      ...item,
      children: item.children?.filter(child => !child.roles || child.roles.includes(userRole)),
    }));
  console.log(sidebarRoleItems)
  return (

    <Sidebar
      className={`
        fixed top-0 left-0 h-screen w-64  transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} 
        lg:translate-x-0 lg:static`}
    >


      <div className="flex items-top justify-between mp-2">
        <div className="w-30 lg:h-16 sm:h-14 mb-5">
          <Logo />
        </div>
        <HiX className="h-5 w-5 lg:hidden" onClick={() => setIsSidebarOpen(false)} />

      </div>

      <SidebarItems>
        <SidebarItemGroup>
          {sidebarRoleItems?.map((item, index) => (
            item.children ? (
              <SidebarCollapse key={index} icon={item.icon} label={item.label} >
                {item.children.map((child, childIndex) => (
                  <SidebarItem key={childIndex} as={NavLink} to={`${item.href}${child.href}`}>
                    {child.label}
                  </SidebarItem>
                ))}
              </SidebarCollapse>
            ) :
              <SidebarItem key={index} as={NavLink} to={item.href} icon={item.icon}>
                {item.label}
              </SidebarItem>
          ))
          }
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>

  )
}

export default Side