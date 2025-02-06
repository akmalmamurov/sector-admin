import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarDemo } from "@/components/sidebar/Sidebar";

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <SidebarDemo />

      {/* Main content */}
      <div className="flex-1 flex flex-col  transition-all duration-300 w-full">
        {/* Header */}
        <header className="h-14 bg-white shadow-md flex items-center px-6 w-full">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
