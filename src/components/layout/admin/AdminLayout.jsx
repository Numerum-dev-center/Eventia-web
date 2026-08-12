import DashboardLayout from "../DashboardLayout";
import { adminMenu } from "../menu/admin/adminMenu";


function AdminLayout() {
  return (
    <DashboardLayout
      title="Eventia Administration"
      menuItems={adminMenu}
    />
  );
}


export default AdminLayout;
