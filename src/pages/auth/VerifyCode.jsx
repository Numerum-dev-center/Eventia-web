import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck, Hash, TriangleAlert } from "lucide-react";
import { AuthShell } from "../../components/auth/AuthShell";
import { forgotPassword, verifyResetCode } from "../../services/authService";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) { setError("Adresse email manquante. Recommencez la procédure."); return; }
    if (code.trim().length !== 6) { setError("Le code de vérification doit contenir 6 chiffres."); return; }
    setLoading(true); setError("");
    try {
      await verifyResetCode({ email, code: code.trim() });
      navigate("/reset-password", { state: { email, code: code.trim() } });
    } catch (requestError) {
      const backendMessage = requestError?.response?.data?.message;
      setError((Array.isArray(backendMessage) ? backendMessage.join(" ") : backendMessage) || "Le code est incorrect ou expiré.");
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true); setResendMessage("");
    try { await forgotPassword(email); setResendMessage("Un nouveau code vient de vous être envoyé."); }
    catch { setResendMessage("Impossible de renvoyer le code pour le moment."); }
    finally { setResending(false); }
  };

  return (
    <AuthShell
      eyebrow="Vérification sécurisée"
      title="Entrez votre code."
      description={<>Nous avons envoyé 6 chiffres à <strong>{email || "votre adresse email"}</strong>.</>}
      backTo="/forgot-password"
      backLabel="Modifier l’adresse"
    >
      {error && <div className="auth-alert auth-alert--error" role="alert"><TriangleAlert size={16} /> {error}</div>}
      {resendMessage && <div className="auth-alert auth-alert--info" role="status"><CircleCheck size={16} /> {resendMessage}</div>}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field"><label htmlFor="verification-code">Code de vérification</label><div className="auth-input-wrap"><Hash size={17} /><input className="auth-code-input" id="verification-code" type="text" inputMode="numeric" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" autoComplete="one-time-code" /></div></div>
        <button className="auth-primary" type="submit" disabled={loading} aria-busy={loading}>{loading ? "Vérification…" : <>Continuer <ArrowRight size={17} /></>}</button>
      </form>
      <p className="auth-help">Code non reçu ? <button type="button" onClick={handleResend} disabled={resending}>{resending ? "Envoi…" : "Renvoyer le code"}</button><br /><Link className="auth-inline-link" to="/login">Retour à la connexion</Link></p>
    </AuthShell>
  );
}

export default VerifyCode;
