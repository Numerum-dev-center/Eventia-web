import {
  UserPlus,
  CalendarPlus,
  Ticket,
  QrCode,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Créez un compte",
      description:
        "Inscrivez-vous gratuitement et accédez à votre espace organisateur.",
    },
    {
      icon: CalendarPlus,
      number: "02",
      title: "Créez votre événement",
      description:
        "Ajoutez les informations de votre événement, les billets et les dates.",
    },
    {
      icon: Ticket,
      number: "03",
      title: "Vendez vos billets",
      description:
        "Partagez votre événement et suivez vos ventes en temps réel.",
    },
    {
      icon: QrCode,
      number: "04",
      title: "Scannez les billets",
      description:
        "Contrôlez rapidement les accès grâce au QR Code lors de l'événement.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* En-tête */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-blue-500 font-semibold uppercase tracking-widest">
            Comment ça marche
          </span>

          <h2 className="mt-4 text-4xl lg:text-4xl font-bold text-gray-900">
            Organisez un événement en quelques étapes
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Avec Eventia, tout est pensé pour vous permettre
            de créer, gérer et réussir vos événements
            rapidement et efficacement.
          </p>

        </div>

        {/* Étapes */}

        <div className="relative mt-20">

          {/* Ligne centrale (desktop uniquement) */}

          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-blue-100 rounded-full"></div>

          <div className="grid gap-10 lg:grid-cols-4 relative">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative text-center"
                >

                  {/* Cercle */}

                  <div
                    className="
                      mx-auto
                      w-24
                      h-24
                      rounded-full
                      bg-blue-500
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      relative
                      z-10
                    "
                  >
                    <Icon
                      size={38}
                      className="text-white"
                    />
                  </div>

                  {/* Numéro */}

                  <span className="block mt-6 text-blue-500 font-bold text-lg">

                    {step.number}

                  </span>

                  {/* Titre */}

                  <h3 className="mt-3 text-2xl font-bold text-gray-900">

                    {step.title}

                  </h3>

                  {/* Description */}

                  <p className="mt-4 text-gray-600 leading-7">

                    {step.description}

                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;