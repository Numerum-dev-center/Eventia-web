import { Link } from "react-router-dom";
import { ArrowRight, MailCheck } from "lucide-react";
import { AuthStatus } from "../../components/auth/AuthShell";

function Activate() {
  return (
    <AuthStatus
      icon={<MailCheck size={34} />}
      tone="orange"
      title="Consultez votre boîte mail."
      action={<Link className="auth-primary" to="/login">Aller à la connexion <ArrowRight size={16} /></Link>}
    >
      Un lien d’activation vient de vous être envoyé. Cliquez sur <strong>« Activer mon compte »</strong> pour finaliser votre inscription.
    </AuthStatus>
  );
}

export default Activate;
