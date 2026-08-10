import { Star } from "lucide-react";

function Testimonials() {

  const testimonials = [
    {
      name: "Koffi Mensah",
      role: "Organisateur de concerts",
      image: null,
      message:
        "Avec Eventia, la gestion de nos concerts est devenue beaucoup plus simple. La billetterie et le scan QR Code nous font gagner énormément de temps.",
    },

    {
      name: "Sarah Adjoua",
      role: "Responsable événementiel",
      image: null,
      message:
        "J'apprécie surtout le tableau de bord qui permet de suivre les ventes et les participants en temps réel.",
    },

    {
      name: "David Kouassi",
      role: "Créateur de festivals",
      image: null,
      message:
        "Eventia nous aide à organiser nos événements professionnels avec une expérience plus moderne pour nos participants.",
    },
  ];


  return (

    <section
    id="testimonials"
    className="py-24 bg-[#EEF1F6]"
>

      <div className="max-w-7xl mx-auto px-6">


        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">


          <span
            className="
              text-orange-500
              font-semibold
              uppercase
              tracking-widest
            "
          >
            Témoignages
          </span>


          <h2
            className="
              mt-4
              text-4xl
              lg:text-4xl
              font-bold
              text-gray-900
            "
          >
            Ce que disent nos organisateurs
          </h2>


          <p
            className="
              mt-6
              text-lg
              text-gray-600
              leading-8
            "
          >
            Découvrez comment Eventia aide les
            organisateurs à créer des événements
            réussis.
          </p>


        </div>



        {/* Cards */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
            mt-16
          "
        >


          {testimonials.map((testimonial) => (

            <div
              key={testimonial.name}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                border
                border-gray-100
                hover:shadow-xl
                transition
              "
            >


              {/* Etoiles */}

              <div className="flex gap-1">

                {[1,2,3,4,5].map((star) => (

                  <Star
                    key={star}
                    size={18}
                    className="fill-orange-400 text-orange-400"
                  />

                ))}

              </div>



              {/* Message */}

              <p
                className="
                  mt-6
                  text-gray-600
                  leading-7
                "
              >

                "{testimonial.message}"

              </p>



              {/* Profil */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mt-8
                "
              >


                {/* Avatar */}

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                    text-orange-500
                    font-bold
                    text-xl
                  "
                >

                  {testimonial.name.charAt(0)}

                </div>



                <div>

                  <h3
                    className="
                      font-bold
                      text-gray-900
                    "
                  >

                    {testimonial.name}

                  </h3>


                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >

                    {testimonial.role}

                  </p>


                </div>


              </div>


            </div>

          ))}


        </div>


      </div>


    </section>

  );
}


export default Testimonials;