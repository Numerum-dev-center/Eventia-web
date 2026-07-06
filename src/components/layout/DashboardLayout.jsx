import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ title, menuItems }) {
  return (
    <div className="flex min-h-screen bg-[#F7F8FC]">
  <Sidebar
    title={title}
    menuItems={menuItems}
  />

  <div className="flex-1 flex flex-col bg-[#FFFFFF]">
    <Topbar />

    <main className="flex-1 p-8 bg-[#f1ebe7]">
      <Outlet />
    </main>
  </div>
</div>
  );
}

export default DashboardLayout;