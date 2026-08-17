import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck, Eye, EyeOff, LockKeyhole, TriangleAlert } from "lucide-react";
import { AuthShell } from "../../components/auth/AuthShell";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const code = location.state?.code || "";
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !code) { setError("Session expirée. Recommencez la procédure de réinitialisation."); return; }
    if (!password || password.length < 8) { setError("Le mot de passe doit contenir au moins 8 caractères."); return; }
    if (password !== confirmPassword) { setError("Les mots de passe ne correspondent pas."); return; }
    setLoading(true); setError("");
    try {
      await resetPassword({ email, code, nouveauMotDePasse: password, confirmerMotDePasse: confirmPassword });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (requestError) {
      const backendMessage = requestError?.response?.data?.message;
      setError((Array.isArray(backendMessage) ? backendMessage.join(" ") : backendMessage) || "Impossible de réinitialiser le mot de passe. Réessayez.");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell eyebrow="Dernière étape" title="Nouveau mot de passe." description="Choisissez un mot de passe unique d’au moins 8 caractères." backTo="/verify-code" backLabel="Retour au code">
      {error && <div className="auth-alert auth-alert--error" role="alert"><TriangleAlert size={16} /> {error}</div>}
      {success && <div className="auth-alert auth-alert--success" role="status"><CircleCheck size={16} /> Mot de passe mis à jour. Redirection en cours…</div>}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field"><label htmlFor="new-password">Nouveau mot de passe</label><div className="auth-input-wrap auth-input-wrap--action"><LockKeyhole size={17} /><input id="new-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="8 caractères minimum" autoComplete="new-password" /><button className="auth-input-action" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer les mots de passe" : "Afficher les mots de passe"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></div>
        <div className="auth-field"><label htmlFor="confirm-new-password">Confirmer le mot de passe</label><div className="auth-input-wrap"><LockKeyhole size={17} /><input id="confirm-new-password" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Répétez votre mot de passe" autoComplete="new-password" /></div></div>
        <button className="auth-primary" type="submit" disabled={loading || success} aria-busy={loading}>{loading ? "Mise à jour…" : <>Enregistrer le mot de passe <ArrowRight size={17} /></>}</button>
      </form>
      <p className="auth-help"><Link className="auth-inline-link" to="/login">Retour à la connexion</Link></p>
    </AuthShell>
  );
}

export default ResetPassword;
