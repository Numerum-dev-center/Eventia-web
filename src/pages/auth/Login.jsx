import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AuthShell } from "../../components/auth/AuthShell";
import { login } from "../../services/authService";
import { setStoredAuth } from "../../services/authSession";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!formData.email.trim() || !formData.password.trim()) return "Merci de remplir tous les champs.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Adresse email invalide.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError("");

    try {
      const response = await login({
        email: formData.email.trim().toLowerCase(),
        motDePasse: formData.password,
      });
      const authState = setStoredAuth({
        token: response.accessToken,
        user: { email: response.email, role: response.role },
      });
      const role = authState.user.role?.trim().toLowerCase();
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (role === "organizer") navigate("/organizer/dashboard", { replace: true });
      else setError(`Rôle non reconnu : ${role}`);
    } catch (requestError) {
      const backendMessage = requestError.response?.data?.message;
      setError((Array.isArray(backendMessage) ? backendMessage.join(" ") : backendMessage) || requestError.message || "Impossible de vous connecter.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4090";
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <AuthShell
      eyebrow="Heureux de vous revoir"
      title="Se connecter."
      description={<>Nouveau sur Eventia ? <Link to="/register">Créer un compte</Link></>}
    >
      {error && <div className="auth-alert auth-alert--error" role="alert"><TriangleAlert size={16} /> {error}</div>}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="login-email">Adresse email</label>
          <div className="auth-input-wrap"><Mail size={17} /><input id="login-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="vous@exemple.com" autoComplete="email" /></div>
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Mot de passe</label>
          <div className="auth-input-wrap auth-input-wrap--action">
            <LockKeyhole size={17} />
            <input id="login-password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Votre mot de passe" autoComplete="current-password" />
            <button className="auth-input-action" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
        </div>
        <div className="auth-row">
          <label className="auth-check"><input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} /> Rester connecté</label>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </div>
        <button className="auth-primary" type="submit" disabled={loading} aria-busy={loading}>{loading ? "Connexion en cours…" : <>Se connecter <ArrowRight size={17} /></>}</button>
      </form>

      <div className="auth-divider">ou</div>
      <button className="auth-secondary" type="button" onClick={handleGoogleLogin}><FcGoogle size={21} /> Continuer avec Google</button>
    </AuthShell>
  );
}

export default Login;
