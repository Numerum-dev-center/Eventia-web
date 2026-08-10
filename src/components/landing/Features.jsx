import {
  CalendarDays,
  Ticket,
  CreditCard,
  QrCode,
  Users,
  BarChart3,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: CalendarDays,
      title: "Création d'événements",
      description:
        "Créez et personnalisez vos événements en quelques clics avec une interface simple et intuitive.",
    },
    {
      icon: Ticket,
      title: "Billetterie en ligne",
      description:
        "Vendez vos billets en ligne et suivez vos ventes en temps réel.",
    },
    {
      icon: CreditCard,
      title: "Paiements sécurisés",
      description:
        "Acceptez les paiements en toute sécurité et gérez vos reversements facilement.",
    },
    {
      icon: QrCode,
      title: "QR Code & Scan",
      description:
        "Validez les billets rapidement grâce au scan QR Code depuis votre smartphone.",
    },
    {
      icon: Users,
      title: "Gestion des participants",
      description:
        "Consultez la liste des participants et suivez les présences pendant l'événement.",
    },
    {
      icon: BarChart3,
      title: "Tableau de bord",
      description:
        "Analysez vos performances grâce aux statistiques, revenus et rapports détaillés.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-[#EEF1F6]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Fonctionnalités
          </span>

          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">
            Tout ce qu'il faut pour réussir vos événements
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Eventia met à votre disposition tous les outils nécessaires
            pour organiser, gérer et développer vos événements.
          </p>

        </div>

        {/* Cartes */}

        <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-8 mt-20">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  border border-gray-100
                "
              >
                {/* Icône */}

                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-orange-100
                  flex
                  items-center
                  justify-center
                ">

                  <Icon
                    size={25}
                    className="text-orange-500"
                  />

                </div>

                {/* Titre */}

                <h3 className="mt-8 text-2xl font-bold text-gray-900">

                  {feature.title}

                </h3>

                {/* Description */}

                <p className="mt-4 text-gray-600 leading-7">

                  {feature.description}

                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;