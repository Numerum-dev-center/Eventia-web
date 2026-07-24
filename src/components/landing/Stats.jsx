import {
  CalendarCheck,
  Ticket,
  Users,
  MapPin,
} from "lucide-react";

function Stats() {

  const stats = [
    {
      icon: CalendarCheck,
      value: "500+",
      label: "Événements organisés",
    },
    {
      icon: Ticket,
      value: "15K+",
      label: "Billets vendus",
    },
    {
      icon: Users,
      value: "25K+",
      label: "Participants",
    },
    {
      icon: MapPin,
      value: "20+",
      label: "Villes couvertes",
    },
  ];


  return (
    <section className="py-24 bg-orange-500">

      <div className="max-w-7xl mx-auto px-6">


        {/* Titre */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-orange-100 font-semibold uppercase tracking-widest">
            Nos chiffres
          </span>


          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">

            Une plateforme pensée pour
            les organisateurs

          </h2>


          <p className="mt-6 text-orange-50 text-lg leading-8">

            Eventia accompagne les organisateurs dans
            la création, la gestion et la réussite
            de leurs événements.

          </p>

        </div>



        {/* Statistiques */}


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">


          {stats.map((stat) => {

            const Icon = stat.icon;


            return (

              <div
                key={stat.label}
                className="
                  bg-white/10
                  backdrop-blur-sm
                  border
                  border-white/20
                  rounded-3xl
                  p-8
                  text-center
                  hover:bg-white/20
                  transition
                "
              >


                <div
                  className="
                    mx-auto
                    w-16
                    h-16
                    rounded-2xl
                    bg-white
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Icon
                    size={32}
                    className="text-orange-500"
                  />

                </div>



                <h3
                  className="
                    mt-6
                    text-4xl
                    font-bold
                    text-white
                  "
                >

                  {stat.value}

                </h3>



                <p
                  className="
                    mt-3
                    text-orange-100
                    font-medium
                  "
                >

                  {stat.label}

                </p>


              </div>

            );

          })}


        </div>


      </div>

    </section>
  );
}


export default Stats;