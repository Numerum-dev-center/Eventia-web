import { Bell, Search, UserCircle } from "lucide-react";

import { Link } from "react-router-dom";

import { getStoredAuth } from "../../services/authSession";
import { useState } from "react";

import { getEvents } from "../../data/eventsData";

function OrganizerTopbar({ title, subtitle, organizer }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = getEvents().filter((event) =>
  event.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  event.lieu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  event.categorie?.toLowerCase().includes(searchTerm.toLowerCase())
);

  
  return (
    <header className="bg-[#F1EBE7] shadow-sm rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
      
      {/* Partie gauche */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
        {/* Barre de recherche */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-8 py-2 w-92 mt-4">
          <Search size={22} className="text-gray-500" />
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
      <div className="flex items-center gap-5">

        

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
    px-4
    py-2
    rounded-2xl
    hover:bg-orange-100
    transition
  "
>
        


          <UserCircle size={38} className="text-orange-500" />

          <div className="hidden sm:block">
            <p className="font-semibold text-gray-800">
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