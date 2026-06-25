

import "tailwindcss";

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white">
          Eventia
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-white hover:text-gray-200"
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold"
          >
            Inscription
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h2 className="text-5xl font-bold text-white max-w-3xl">
          Organisez vos événements simplement avec Eventia
        </h2>

        <p className="text-white/90 mt-6 max-w-xl text-lg">
          Planifiez, gérez et partagez vos événements depuis une seule plateforme.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            Commencer
          </Link>

          <Link
            to="/login"
            className="border-2 border-white text-white px-6 py-3 rounded-xl"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;