import DashboardLayout from "./DashboardLayout";
import { organizerMenu } from "./menu/organizerMenu";

function OrganizerLayout() {
  return (
    <DashboardLayout
      title="Eventia Organisateur"
      menuItems={organizerMenu}
    />
  );
}

export default OrganizerLayout;