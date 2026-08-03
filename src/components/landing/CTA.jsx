import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarPlus,
} from "lucide-react";

import Button from "../ui/Button";


function CTA() {

  return (

    <section
      className="
        py-24
        bg-blue-500
        relative
        overflow-hidden
      "
    >

      {/* Décorations */}

      <div
        className="
          absolute
          -top-24
          -left-24
          w-72
          h-72
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-24
          w-96
          h-96
          rounded-full
          bg-white/10
        "
      />



      <div
        className="
          relative
          max-w-5xl
          mx-auto
          px-6
          text-center
        "
      >


        {/* Icon */}

        <div
          className="
            mx-auto
            w-20
            h-20
            rounded-3xl
            bg-white
            flex
            items-center
            justify-center
          "
        >

          <CalendarPlus
            size={40}
            className="text-blue-500"
          />

        </div>



        <h2
          className="
            mt-8
            text-4xl
            lg:text-4xl
            font-bold
            text-white
            leading-tight
          "
        >

          Prêt à organiser votre
          prochain événement ?

        </h2>



        <p
          className="
            mt-6
            text-lg
            lg:text-xl
            text-blue-100
            max-w-3xl
            mx-auto
          "
        >

          Créez votre compte gratuitement,
          lancez votre événement,
          vendez vos billets et gérez vos participants
          avec Eventia.

        </p>



        {/* Boutons */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-5
          "
        >


          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Créer un compte maintenant
            <ArrowRight size={18} />
          </Link>

         



          <Link
            to="/login"
            className="
              px-8
              py-4
              rounded-xl
              border-2
              border-white
              text-white
              font-semibold
              hover:bg-white
              hover:text-blue-500
              transition
            "
          >

            Se connecter

          </Link>


        </div>



      </div>


    </section>

  );
}


export default CTA;