import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-3xl shadow-lg border border-gray-500">

        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-orange-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Mot de passe oublié
          </h1>

          <p className="text-gray-500 mt-2">
            Entrez votre adresse email pour recevoir un code de
            réinitialisation.
          </p>
        </div>

        {/* Formulaire */}
        <form className="space-y-5">
          <Input
            label="Adresse email"
            type="email"
            placeholder="exemple@email.com"
          />

          <Button type="submit" className="w-full">
            Envoyer le code
          </Button>
        </form>

        {/* Retour connexion */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={18} />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;