import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, Eye, EyeOff, LockKeyhole, Mail, Ticket, TriangleAlert } from "lucide-react";
import { AuthShell } from "../../components/auth/AuthShell";
import { register } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ role: "client", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    if (!formData.email.trim() || !formData.password || !formData.confirmPassword) return "Merci de remplir tous les champs.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Adresse email invalide.";
    if (formData.password.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[\d\W]/.test(formData.password)) {
      return "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.";
    }
    if (formData.password !== formData.confirmPassword) return "Les mots de passe ne correspondent pas.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError("");
    try {
      await register({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });
      navigate("/activate");
    } catch (requestError) {
      const backendMessage = requestError?.response?.data?.message;
      setError((Array.isArray(backendMessage) ? backendMessage.join(" ") : backendMessage) || "Une erreur est survenue lors de l’inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Bienvenue sur Eventia"
      title="Créer un compte."
      description={<>Déjà membre ? <Link to="/login">Se connecter</Link></>}
    >
      {error && <div className="auth-alert auth-alert--error" role="alert"><TriangleAlert size={16} /> {error}</div>}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label>Comment utiliserez-vous Eventia ?</label>
          <div className="auth-role-grid" role="group" aria-label="Type de compte">
            <button className={`auth-role ${formData.role === "client" ? "is-active" : ""}`} type="button" aria-pressed={formData.role === "client"} onClick={() => setFormData((current) => ({ ...current, role: "client" }))}><span><Ticket size={16} /></span><div><strong>Participant</strong><small>Je réserve des billets</small></div></button>
            <button className={`auth-role ${formData.role === "organisateur" ? "is-active" : ""}`} type="button" aria-pressed={formData.role === "organisateur"} onClick={() => setFormData((current) => ({ ...current, role: "organisateur" }))}><span><CalendarDays size={16} /></span><div><strong>Organisateur</strong><small>Je crée des événements</small></div></button>
          </div>
        </div>
        <div className="auth-field"><label htmlFor="register-email">Adresse email</label><div className="auth-input-wrap"><Mail size={17} /><input id="register-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="vous@exemple.com" autoComplete="email" /></div></div>
        <div className="auth-field"><label htmlFor="register-password">Mot de passe</label><div className="auth-input-wrap auth-input-wrap--action"><LockKeyhole size={17} /><input id="register-password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="8 caractères, 1 majuscule, 1 chiffre" autoComplete="new-password" /><button className="auth-input-action" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer les mots de passe" : "Afficher les mots de passe"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></div>
        <div className="auth-field"><label htmlFor="register-confirm">Confirmer le mot de passe</label><div className="auth-input-wrap"><LockKeyhole size={17} /><input id="register-confirm" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Répétez votre mot de passe" autoComplete="new-password" /></div></div>
        <button className="auth-primary" type="submit" disabled={loading} aria-busy={loading}>{loading ? "Création en cours…" : <>Créer mon compte <ArrowRight size={17} /></>}</button>
      </form>
      <p className="auth-help">En créant un compte, vous acceptez nos conditions d’utilisation.</p>
    </AuthShell>
  );
}

export default Register;
