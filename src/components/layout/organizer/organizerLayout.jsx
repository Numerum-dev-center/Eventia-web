import DashboardLayout from "../DashboardLayout";
import { organizerMenu } from "../menu/organizer/organizerMenu";

function OrganizerLayout() {
  return (
    <DashboardLayout
      title="Eventia Organisateur"
      menuItems={organizerMenu}
    />
  );
}

export default OrganizerLayout;