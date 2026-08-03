import PageHeader from "../../components/ui/PageHeader";
import ChangePasswordForm from "../../components/settings/ChangePasswordForm";

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <PageHeader
        title="Paramètres"
        subtitle="Gérez la sécurité de votre compte administrateur."
      />

      <ChangePasswordForm />
    </div>
  );
}

export default SettingsPage;
