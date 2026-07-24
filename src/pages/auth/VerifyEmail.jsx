import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10 text-center">

        <MailCheck
          size={70}
          className="mx-auto text-orange-500 mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">
          Vérifiez votre adresse email
        </h1>

        <p className="text-gray-600 mb-8">
          Un email d'activation vous a été envoyé.
          Cliquez sur <strong>"Activer mon compte"</strong> pour finaliser votre inscription.
        </p>

        <Link
          to="/login"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Retour à la connexion
        </Link>

      </div>
    </div>
  );
}

export default VerifyEmail;