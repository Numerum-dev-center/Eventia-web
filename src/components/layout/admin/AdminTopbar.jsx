import { Search, Bell, UserCircle } from "lucide-react";

function AdminTopbar() {
  return (
    <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
      
      {/* Titre */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Tableau de bord Admin
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gestion de la plateforme Eventia
        </p>
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-5">

        {/* Recherche */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2 w-72">
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Rechercher..."
            className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Bell
            size={22}
            className="text-gray-600 dark:text-gray-200"
          />

          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-3">
          <UserCircle
            size={40}
            className="text-orange-500"
          />

          <div className="hidden sm:block">
            <p className="font-semibold text-gray-800 dark:text-white">
              Administrateur
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              admin@eventia.com
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default AdminTopbar;