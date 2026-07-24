import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Ticket,
  Users,
} from "lucide-react";

import Button from "../ui/Button";

import heroImage from "../../assets/landing/land1.jpg";
// Remplace cette image par une capture de ton dashboard
// ou une photo d'événement.

function Hero() {
  return (
    <section className="bg-[#F8F4EC] pt-36 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}

          <div>

            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">

              <CalendarDays size={18} />

              Plateforme de gestion d'événements

            </span>

            <h1 className="mt-6 text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">

              Organisez vos

              <span className="text-orange-500">
                {" "}événements
              </span>

              <br />

              simplement.

            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">

              Eventia vous aide à créer des événements,
              vendre vos billets,
              gérer vos participants,
              scanner les QR Codes
              et suivre vos revenus
              depuis une seule plateforme.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
            to="/register"
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600"
          >
            Commencer

            <ArrowRight size={18} className="inline ml-2" />
          </Link>

              <Link
                to="/login"
                className="border border-gray-300 rounded-xl px-8 py-4 font-semibold hover:border-orange-500 hover:text-orange-500 transition"
              >
                Se connecter
              </Link>

            </div>

            {/* Statistiques */}

            <div className="flex flex-wrap gap-10 mt-16">

              <div>

                <div className="flex items-center gap-2">

                  <Ticket
                    size={20}
                    className="text-orange-500"
                  />

                  <span className="text-3xl font-bold">

                    10K+

                  </span>

                </div>

                <p className="text-gray-500 mt-2">
                  Billets vendus
                </p>

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <Users
                    size={20}
                    className="text-orange-500"
                  />

                  <span className="text-3xl font-bold">

                    3K+

                  </span>

                </div>

                <p className="text-gray-500 mt-2">
                  Participants
                </p>

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <CalendarDays
                    size={20}
                    className="text-orange-500"
                  />

                  <span className="text-3xl font-bold">

                    500+

                  </span>

                </div>

                <p className="text-gray-500 mt-2">
                  Événements
                </p>

              </div>

            </div>

          </div>

          {/* Image */}

          <div className="relative flex justify-center">

            <div className="absolute w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

            <img
              src={heroImage}
              alt="Dashboard Eventia"
              className="relative w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;