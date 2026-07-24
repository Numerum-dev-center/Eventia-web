import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import eventImage from "../../assets/organizer/im-land.jpg";
import { FcGoogle } from "react-icons/fc";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import SocialButton from "../../components/ui/SocialButton";
import { login } from "../../services/authService"; // à créer, voir plus bas
import { setStoredAuth } from "../../services/authSession";

import { ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      return "Merci de remplir tous les champs.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Adresse email invalide.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await login({
      email: formData.email.trim().toLowerCase(),
      motDePasse: formData.password,
    });

    const authState = setStoredAuth({
      token: response.accessToken,
      user: {
        email: response.email,
        role: response.role,
      },
    });

    const role = authState.user.role
  ?.trim()
  .toLowerCase();

console.log("ROLE =", role);

switch (role) {
  case "admin":
    navigate("/admin/dashboard", { replace: true });
    break;

  case "organisateur":
    navigate("/organizer/dashboard", { replace: true });
    break;

  default:
    setError(`Rôle non reconnu : ${role}`);
}
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.message ||
      "Erreur de connexion"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        <div className="relative hidden md:flex items-center justify-center overflow-hidden">
          <div className="absolute -right-32 top-0 h-full w-96 bg-white/10 rounded-l-full" />
          <img
            src={eventImage}
            alt="Concert"
            className="w-[90%] rounded-3xl shadow-xl object-cover"
          />
        </div>

        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">

            <Link to="/" className="absolute top-15  inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6"
            >
              <ArrowLeft size={22} />
              <span>Retour à l'accueil</span>
            </Link>
            <h2 className="text-5xl font-bold text-gray-800 mb-3">Login</h2>

            <p className="text-gray-500 mb-10">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register" className="text-orange-500 font-medium hover:underline">
                Créer un compte
              </Link>
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm" role="alert">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="sr-only">Adresse email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-500">
                  <Input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  Rester connecté
                </label>

                <Link to="/forgot-password" className="text-gray-500 hover:text-pink-500">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? "Connexion..." : "Login"}
              </Button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-5">Ou continuer avec Google</p>
              <div className="flex justify-center">
                <SocialButton icon={<FcGoogle size={24} />} onClick={() => alert("Google cliqué")}>
                  Continuer avec Google
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;