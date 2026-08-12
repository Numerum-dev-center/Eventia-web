import { Link } from "react-router-dom";
import { ArrowRight, MailCheck } from "lucide-react";
import { AuthStatus } from "../../components/auth/AuthShell";

function VerifyEmail() {
  return (
    <AuthStatus
      icon={<MailCheck size={34} />}
      tone="orange"
      title="Vérifiez votre adresse email."
      action={<Link className="auth-primary" to="/login">Retour à la connexion <ArrowRight size={16} /></Link>}
    >
      Un email d’activation vous a été envoyé. Utilisez le bouton <strong>« Activer mon compte »</strong> présent dans le message pour continuer.
    </AuthStatus>
  );
}

export default VerifyEmail;
