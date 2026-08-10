import { Bell, Search, UserCircle } from "lucide-react";

import { Link } from "react-router-dom";

import { getStoredAuth } from "../../services/authSession";
import { useState } from "react";

function OrganizerTopbar({ title, subtitle, organizer }) {
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <header className="bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4 mb-2 flex items-center justify-between gap-6">

      {/* Partie gauche */}
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-gray-900 truncate">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">
            {subtitle}
          </p>
        )}
        {/* Barre de recherche */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-80 mt-3">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-4 shrink-0">



        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profil */}


        <Link
  to="/organizer/profile"
  className="
    flex
    items-center
    gap-3
    cursor-pointer
    bg-orange-50
    px-3
    py-2
    rounded-2xl
    hover:bg-orange-100
    transition
  "
>


          <UserCircle size={32} className="text-orange-500" />

          <div className="hidden sm:block">
            <p className="font-semibold text-gray-800 text-sm">
              Organisateur
              </p>
            <p className="text-xs text-gray-500">
              {getStoredAuth()?.user?.email}
              {organizer?.email}
              </p>
          </div>
          </Link>
        </div>


    </header>
  );
}

export default OrganizerTopbar;