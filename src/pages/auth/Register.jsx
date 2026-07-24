import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import eventImage from "../../assets/organizer/im-land.jpg";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { register } from "../../services/authService";

import { ArrowLeft } from "lucide-react";

function Register() {
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (
      
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return "Merci de remplir tous les champs.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Adresse email invalide.";
    }

    if (formData.password.length < 6) {
      return "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
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
    await register({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    // Redirection vers une page informant l'utilisateur
    navigate("/activate");

  } catch (err) {
    setError(
      err?.response?.data?.message ||
      "Une erreur est survenue lors de l'inscription."
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
            <Link to="/" className="absolute top-19  inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6"
            >
              <ArrowLeft size={22} />
              <span>Retour à l'accueil</span>
            </Link>
            

            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Créer un compte
            </h2>
            <p className="text-gray-500 mb-10">
              Vous avez déjà un compte ?{" "}
              <Link to="/Login" className="text-orange-500 font-medium hover:underline">
                Se connecter
              </Link>
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm" role="alert">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>

              

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
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
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;