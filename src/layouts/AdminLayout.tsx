import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarDemo } from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";
import classNames from "classnames";
import { Settings } from "lucide-react";
import { useCurrentColor } from "@/hooks";

export const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const theme = useCurrentColor();
  return (
    <>
      <SidebarProvider>
        <div
          className={classNames(
            "flex min-h-screen overflow-y-auto w-full",
            theme.bg
          )}
        >
          <SidebarDemo open={open} />
          <div className="flex-1 flex flex-col transition-all duration-300 w-full">
            <header
              className={classNames(
                "h-[300px]  shadow-md  w-full  pt-5",
                open ? "pl-[260px]" : "pl-[114px]",
                theme.header
              )}
            >
              <Navbar
                setOpen={setOpen}
                open={open}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </header>
            <main
              className={classNames(
                "flex-1   -mt-20 pr-8 ",
                open ? "pl-[292px]" : "pl-[146px]",
                theme.mainColor
              )}
            >
              <div className="-mt-28">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="w-[56px] h-[56px] bg-white shadow-lg rounded-full flex items-center justify-center fixed bottom-14 right-16"
        >
          <Settings className="text-textColor" />
        </button>
      </SidebarProvider>
    </>
  );
};
