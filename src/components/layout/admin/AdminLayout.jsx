import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar";
import Topbar from "../Topbar";


import DashboardLayout from "../DashboardLayout";
import { adminMenu } from "../menu/admin/adminMenu";


function AdminLayout() {
  return (
    <DashboardLayout
      title="Eventia admin"
      menuItems={adminMenu}
    />
  );
}


export default AdminLayout;