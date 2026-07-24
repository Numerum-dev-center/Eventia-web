import { useState } from "react";
import { Plus, Minus } from "lucide-react";

function FAQ() {

  const faqs = [
    {
      question: "Comment créer un événement sur Eventia ?",
      answer:
        "Après votre inscription, vous accédez à votre espace organisateur. Vous pouvez créer votre événement, ajouter les informations, définir vos billets et publier votre événement.",
    },

    {
      question: "Comment fonctionne la billetterie ?",
      answer:
        "Vous créez différents types de billets, définissez les prix et partagez votre page événement. Les participants peuvent ensuite acheter leurs billets en ligne.",
    },

    {
      question: "Comment fonctionne le scan QR Code ?",
      answer:
        "Chaque billet possède un QR Code unique. Lors de l'événement, vous pouvez scanner les billets pour vérifier rapidement l'accès des participants.",
    },

    {
      question: "Comment recevoir mes revenus ?",
      answer:
        "Après votre événement, vos revenus sont calculés automatiquement. Vous pouvez suivre vos ventes et effectuer vos demandes de reversement depuis votre espace organisateur.",
    },

    {
      question: "Puis-je organiser plusieurs événements ?",
      answer:
        "Oui. Avec un seul compte organisateur, vous pouvez créer et gérer plusieurs événements simultanément.",
    },

  ];


  const [openIndex, setOpenIndex] = useState(null);



  const toggleFAQ = (index) => {

    setOpenIndex(
      openIndex === index ? null : index
    );

  };



  return (

    <section
      id="faq"
      className="py-24 bg-white"
    >

      <div className="max-w-5xl mx-auto px-6">


        {/* Header */}

        <div className="text-center">


          <span
            className="
              text-orange-500
              font-semibold
              uppercase
              tracking-widest
            "
          >
            Questions
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
            Eventia répond à tout vos préocupations
          </h2>


          <p
            className="
              mt-6
              text-lg
              text-gray-600
            "
          >
            Retrouvez les réponses aux questions
            les plus posées sur Eventia.
          </p>


        </div>



        {/* Questions */}

        <div
          className="
            mt-16
            space-y-5
          "
        >


          {faqs.map((faq, index) => (

            <div
              key={index}
              className="
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                bg-[#F8F4EC]
              "
            >


              {/* Question */}

              <button
                onClick={() => toggleFAQ(index)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  p-6
                  text-left
                "
              >

                <span
                  className="
                    font-semibold
                    text-lg
                    text-gray-900
                  "
                >

                  {faq.question}

                </span>


                <span
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                  "
                >

                  {openIndex === index ? (

                    <Minus
                      size={20}
                      className="text-orange-500"
                    />

                  ) : (

                    <Plus
                      size={20}
                      className="text-orange-500"
                    />

                  )}

                </span>


              </button>



              {/* Réponse */}

              {openIndex === index && (

                <div
                  className="
                    px-6
                    pb-6
                    text-gray-600
                    leading-7
                  "
                >

                  {faq.answer}

                </div>

              )}


            </div>

          ))}


        </div>


      </div>


    </section>

  );
}


export default FAQ;