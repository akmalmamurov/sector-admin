import { Home, Settings, ShoppingBasket, Grid } from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { logo, logoXl } from "@/assets/images";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Category", url: "/categories", icon: Grid },
  { title: "Products", url: "/products", icon: ShoppingBasket },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const SidebarDemo = ({ open }: { open: boolean }) => {
  return (
    <aside className="pt-5 px-5 fixed left-0 z-50">
      <div
        className={classNames(
          " bg-white text-black transition-all duration-300 relative overflow-hidden rounded-md shadow-xl",
          open ? "w-[240px]" : "w-24"
        )}
        style={{
          transition: "width 0.5s, padding 0.3s",
          paddingLeft: open ? "1rem" : "0.5rem",
          paddingRight: open ? "1rem" : "0.5rem",
          height: "calc(-2rem + 100vh)",
        }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-center px-4 py-3">
          {open ? (
            <img src={logoXl} alt="logo" className="w-[155px]" />
          ) : (
            <img src={logo} alt="logo" className="h-6 w-72 object-center" />
          )}
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
                      `flex items-center cursor-pointer mb-1 ${
                        open ? "justify-normal" : "justify-center"
                      } gap-3 px-4 py-3 rounded-md hover:bg-navMenu/80 hover:text-white hoverEffect`,
                      isActive
                        ? "bg-navMenu text-white" // Active state styles
                        : "text-itemColor" // Default state styles
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
    </aside>
  );
};
