import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, Sparkles, Zap } from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/events?q=${encodeURIComponent(search.trim())}` : "/events");
  };

  return (
    <section className="relative overflow-hidden bg-[#0B1330] pt-40 pb-32">
      {/* Fond : grille + halo radial, façon "Cosmo" */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,253,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,253,0.15) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-orange-500/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-white/10 text-orange-200 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
          <Sparkles size={16} />
          Plateforme de gestion d'événements
        </span>

        <h1 className="mt-8 text-4xl lg:text-6xl font-extrabold text-white leading-tight">
          Trouvez votre prochaine{" "}
          <span className="inline-flex items-center gap-2 text-orange-300">
            expérience <Sparkles size={36} className="hidden sm:inline" />
          </span>
          <br />
          Réservez instantanément{" "}
          <Zap size={36} className="inline text-orange-300 fill-orange-300" />
        </h1>

        <p className="mt-6 text-lg text-slate-300 leading-8 max-w-2xl mx-auto">
          Une plateforme minimaliste pensée pour vous faire vivre les
          événements que vous aimez, sans friction. Réservez en un geste,
          gardez votre billet, entrez directement.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            to="/register"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
          >
            Commencer
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/events"
            className="border border-white/20 text-white rounded-xl px-6 py-3 font-semibold hover:border-orange-300 hover:text-orange-200 transition"
          >
            Voir les événements
          </Link>
        </div>
      </div>

      {/* Carte de recherche flottante, à cheval sur le bas du hero */}
      <div className="relative max-w-5xl mx-auto px-6 mt-16">
        <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Réservez votre place pour l'événement
          </h2>

          <form
            onSubmit={handleSearch}
            className="grid gap-4 lg:grid-cols-[2fr_auto] lg:items-end"
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-gray-500">
                Recherche
              </span>
              <span className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus-within:border-orange-400">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher par nom, lieu ou catégorie"
                  className="w-full outline-none text-sm placeholder:text-gray-400"
                />
              </span>
            </label>

            <button
              type="submit"
              className="bg-orange-500 text-white rounded-xl px-6 py-2.5 font-semibold hover:bg-orange-600 transition inline-flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Hero;
