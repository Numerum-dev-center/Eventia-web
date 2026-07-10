import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ title, menuItems }) {
  
  return (
    <div className="h-screen flex overflow-hidden bg-[#F7F8FC]">
      {/* Sidebar fixe */}
      <Sidebar
        title={title}
        menuItems={menuItems}
      />

      {/* Zone principale */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Topbar fixe */}
        <div className="shrink-0">
          <Topbar />
        </div>

        {/* Contenu scrollable */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#f1ebe7]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;