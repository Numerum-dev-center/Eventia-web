import DashboardLayout from "./DashboardLayout";
import { adminMenu } from "./menu/adminMenu";

function AdminLayout() {
  return (
    <DashboardLayout
      title="Eventia Admin"
      menuItems={adminMenu}
    />
  );
}

export default AdminLayout;