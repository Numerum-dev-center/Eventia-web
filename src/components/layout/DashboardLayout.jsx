import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ title, menuItems }) {
  
  
  return (
    <div className="h-screen flex overflow-hidden bg-[#EEF1F6]">
      {/* Sidebar fixe */}
      <Sidebar
        title={title}
        menuItems={menuItems}
      />

      {/* Zone principale */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar fixe */}
        <div className="shrink-0 px-8 pt-6">
          <Topbar />
        </div>

        {/* Contenu scrollable */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;