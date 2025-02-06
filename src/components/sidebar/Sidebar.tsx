import { Home,Settings, ChevronLeft, ShoppingBasket, Grid } from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";
import { logo, logoXl } from "@/assets/images";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Category", url: "/categories", icon: Grid },
  { title: "Products", url: "/products", icon: ShoppingBasket },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const SidebarDemo = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={classNames(
        "h-screen bg-gray-900 text-white transition-all duration-300 relative",
        open ? "w-64" : "w-24"
      )}
      style={{
        transition: "width 0.5s, padding 0.3s",
        paddingLeft: open ? "1rem" : "0.5rem",
        paddingRight: open ? "1rem" : "0.5rem",
      }}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-center px-4 py-3">
        {open ? (
          <img src={logoXl} alt="logo" className="w-[155px]" />
        ) : (
          <img src={logo} alt="logo" className="h-6 w-72 object-center" />
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-white absolute bg-black rounded-md top-1 w-8 h-8 flex items-center justify-center -right-4 border border-gray-600"
        >
          <ChevronLeft
            size={16}
            className={classNames(
              !open ? "rotate-180" : "",
              "duration-300 ease-in-out"
            )}
          />
        </button>
      </div>

      {/* Sidebar menu */}
      <SidebarContent className="mt-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  classNames(
                    `flex items-center cursor-pointer ${
                      open ? "justify-normal" : "justify-center"
                    } gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition hover:text-white`,
                    { "bg-gray-700 ": isActive }
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {open && (
                  <span
                    className={`whitespace-nowrap transition-opacity duration-300 cursor-pointer ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.title}
                  </span>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
};
