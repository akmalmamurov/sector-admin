import classNames from "classnames";
import { Home,ShoppingBasket, Grid, LogOut, User2,  Earth, ListFilter, Image } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SidebarContent, SidebarMenu, SidebarMenuItem, } from "@/components/ui/sidebar";
import { logo, logoXl } from "@/assets/images";
import useSettings from "@/context/settings";
import useSidebarColor from "@/hooks/useSidebar";
import useStore from "@/context/store"; 

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Catalog", url: "/catalog", icon: Grid },
  { title: "Banner", url: "/banner", icon: Image },
  { title: "Popular category", url: "/popular-category", icon: Grid },
  { title: "Filter", url: "/filter", icon: ListFilter },
  { title: "Products", url: "/products", icon: ShoppingBasket },
  { title: "Brands", url: "/brands", icon: Earth },
  { title: "Users", url: "/users", icon: User2 },
];

export const SidebarDemo = ({ open }: { open: boolean }) => {
  const { sidenavColor } = useSettings();
  const sidebarTheme = useSidebarColor();
  const { logOut } = useStore();

  return (
    <aside className="pt-5 px-5 fixed left-0 z-50">
      <div
        className={classNames(
          `text-black transition-all duration-300 relative overflow-hidden rounded-md shadow-xl`,
          open ? "w-[240px]" : "w-24",
          sidebarTheme.sidebar
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
                      `flex items-center cursor-pointer mb-1 text-sm font-semibold ${
                        open ? "justify-normal" : "justify-center"
                      } gap-3 px-4 py-3 rounded-md`,
                      isActive
                        ? sidenavColor && sidenavColor !== ""
                          ? `${sidenavColor} text-white`
                          : `${sidebarTheme.linkSideBar} ${sidebarTheme.text}`
                        : sidebarTheme.text
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

            <SidebarMenuItem>
              <button
                onClick={logOut} 
                className={classNames(
                  `flex items-center cursor-pointer mb-1 text-sm font-semibold gap-3 px-4 py-3 rounded-md ${sidebarTheme.text}`,
                  open ? "justify-normal" : "justify-center"
                )}
              >
                <LogOut className="w-5 h-5" />
                {open && (
                  <span className="whitespace-nowrap transition-opacity duration-300 cursor-pointer">
                    Logout
                  </span>
                )}
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </div>
    </aside>
  );
};
