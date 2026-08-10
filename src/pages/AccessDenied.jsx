import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold">
          Accès refusé
        </p>

        <h1 className="text-3xl font-bold mt-4 text-gray-900">
          Vous n'avez pas les droits nécessaires
        </h1>

        <p className="text-gray-600 mt-4">
          Cette zone est réservée à un rôle autorisé. Connectez-vous avec un compte administrateur ou organisateur selon l'espace demandé.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="bg-orange-500 text-white px-5 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Retour au login
          </Link>

          <Link
            to="/"
            className="bg-gray-100 text-gray-800 px-5 py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;