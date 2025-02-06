import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarDemo } from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";
import classNames from "classnames";

export const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white overflow-y-auto w-full">
        <SidebarDemo open={open} />
        <div className="flex-1 flex flex-col transition-all duration-300 w-full">
          <header
            className={classNames(
              "h-[300px] bg-header shadow-md  w-full  pt-5",
              open ? "pl-[260px]" : "pl-[114px]"
            )}
          >
            <Navbar setOpen={setOpen} open={open} />
          </header>
          <main
            className={classNames(
              "flex-1  bg-bodyColor -mt-20 pr-8 ",
              open ? "pl-[292px]" : "pl-[146px]"
            )}
          >
            <div className="-mt-32">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
