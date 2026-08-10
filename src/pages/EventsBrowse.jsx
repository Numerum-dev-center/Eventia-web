import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarDays, MapPin, Search, Sparkles } from "lucide-react";

import NavBar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";
import { getPublishedEvents } from "../data/eventsData";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

function EventsBrowse() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const events = getPublishedEvents();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q)
    );
  }, [events, query]);

  return (
    <div className="min-h-screen bg-[#EEF1F6]">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <span className="inline-flex items-center gap-2 text-orange-500 font-semibold uppercase tracking-wider text-sm">
          <Sparkles size={16} />
          Événements
        </span>
        <h1 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
          Tous les événements
        </h1>
        <p className="mt-3 text-gray-500 max-w-2xl">
          Parcourez les événements publiés par nos organisateurs et réservez votre place.
        </p>

        <div className="mt-8 flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-lg">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, lieu ou catégorie"
            className="w-full outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-gray-500 bg-white rounded-2xl p-12 border border-dashed border-gray-200">
            Aucun événement ne correspond à votre recherche.
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {event.category}
                  </span>
                  <h3 className="mt-3 font-bold text-gray-900 text-lg">{event.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={15} />
                    {formatDate(event.date)}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={15} />
                    {event.location}
                  </p>
                  <p className="mt-4 font-semibold text-orange-600">
                    À partir de {Number(event.price).toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default EventsBrowse;
