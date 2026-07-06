import { Bell, Search, UserCircle } from "lucide-react";

function OrganizerTopbar({ title, subtitle }) {
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
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-5">

        {/* Barre de recherche */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-72">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profil */}
        
<div
  className="
  flex
  items-center
  gap-3
  cursor-pointer
  bg-orange-50
  px-4
  py-2
  rounded-2xl
  "
>

          <UserCircle size={38} className="text-orange-500" />

          <div className="hidden sm:block">
            <p className="font-semibold text-gray-800">
              Organisateur
            </p>
            <p className="text-xs text-gray-500">
              organizer@eventia.com
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default OrganizerTopbar;