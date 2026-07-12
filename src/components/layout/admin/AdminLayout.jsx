import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#F7F8FC] dark:bg-gray-900">
      <AdminSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;