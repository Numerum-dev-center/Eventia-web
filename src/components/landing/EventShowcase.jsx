import {
  CalendarDays,
  MapPin,
  ArrowRight,
} from "lucide-react";

import Button from "../ui/Button";

import { Link } from "react-router-dom";

import concert from "../../assets/landing/events/concert.jpg";
import conference from "../../assets/landing/events/conference.jpg";
import festival from "../../assets/landing/events/festival.jpg";
import wedding from "../../assets/landing/events/wedding.jpg";

function EventShowcase() {
  const events = [
    {
      image: concert,
      category: "Concert",
      title: "Concert Live",
      location: "Lomé",
      date: "15 Août 2026",
    },
    {
      image: conference,
      category: "Conférence",
      title: "Tech Conference",
      location: "Cotonou",
      date: "22 Septembre 2026",
    },
    {
      image: festival,
      category: "Festival",
      title: "Festival Culturel",
      location: "Accra",
      date: "05 Octobre 2026",
    },
    {
      image: wedding,
      category: "Événement privé",
      title: "Mariage & Réception",
      location: "Lomé",
      date: "12 Novembre 2026",
    },
  ];

  return (
    <section
      id="events"
      className="py-24 bg-[#EEF1F6]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          <div className="max-w-2xl">

            <span className="text-blue-500 font-semibold uppercase tracking-widest">
              Événements
            </span>

            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">
              Tous les types d'événements,
              une seule plateforme.
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Concerts, conférences, festivals, événements privés,
              salons professionnels...
              Eventia s'adapte à tous vos besoins.
            </p>

          </div>

          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600"
          >
            Découvrir Eventia

            <ArrowRight size={18} className="inline ml-2" />

            </Link>
          

        </div>

        {/* Cartes */}

        <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-8 mt-16">

          {events.map((event) => (

            <article
              key={event.title}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
                group
              "
            >

              {/* Image */}

              <div className="overflow-hidden h-72">

                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

              </div>

              {/* Contenu */}

              <div className="p-6">

                <span
                  className="
                    inline-block
                    bg-blue-100
                    text-blue-600
                    text-sm
                    font-semibold
                    px-4
                    py-2
                    rounded-full
                  "
                >
                  {event.category}
                </span>

                <h3 className="mt-5 text-2xl font-bold text-gray-900">

                  {event.title}

                </h3>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-2 text-gray-600">

                    <MapPin size={18} />

                    {event.location}

                  </div>

                  <div className="flex items-center gap-2 text-gray-600">

                    <CalendarDays size={18} />

                    {event.date}

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}

export default EventShowcase;