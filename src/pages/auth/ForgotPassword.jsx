import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck, Mail, TriangleAlert } from "lucide-react";
import { AuthShell } from "../../components/auth/AuthShell";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) { setError("Merci de renseigner votre adresse email."); setSuccess(""); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { setError("Adresse email invalide."); setSuccess(""); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      await forgotPassword(normalizedEmail);
      setSuccess("Un code de vérification vient de vous être envoyé.");
      setTimeout(() => navigate("/verify-code", { state: { email: normalizedEmail } }), 1200);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Impossible d’envoyer l’email pour le moment. Réessayez plus tard.");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell eyebrow="Récupération du compte" title="Retrouver l’accès." description="Indiquez l’adresse liée à votre compte. Nous vous enverrons un code de vérification sécurisé." backTo="/login" backLabel="Retour à la connexion">
      {error && <div className="auth-alert auth-alert--error" role="alert"><TriangleAlert size={16} /> {error}</div>}
      {success && <div className="auth-alert auth-alert--success" role="status"><CircleCheck size={16} /> {success}</div>}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field"><label htmlFor="forgot-email">Adresse email</label><div className="auth-input-wrap"><Mail size={17} /><input id="forgot-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vous@exemple.com" autoComplete="email" /></div></div>
        <button className="auth-primary" type="submit" disabled={loading} aria-busy={loading}>{loading ? "Envoi en cours…" : <>Recevoir mon code <ArrowRight size={17} /></>}</button>
      </form>
      <p className="auth-help">Vous vous souvenez de votre mot de passe ? <Link className="auth-inline-link" to="/login">Se connecter</Link></p>
    </AuthShell>
  );
}

export default ForgotPassword;
