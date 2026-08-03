import { Link } from "react-router-dom";


import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {

  const productLinks = [
    "Création d'événements",
    "Billetterie",
    "Scan QR Code",
    "Statistiques",
  ];


  const companyLinks = [
    "À propos",
    "Carrières",
    "Blog",
    "Contact",
  ];


  const supportLinks = [
    "Centre d'aide",
    "FAQ",
    "Conditions",
    "Confidentialité",
  ];


  return (

    <footer
      className="
        bg-[#EEF1F6]
        text-gray-500
        pt-20
        pb-8
      "
    >

      <div className="max-w-7xl mx-auto px-6">


        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-12
          "
        >


          {/* Logo */}

          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white text-sm">●</span>
              Eventia
            </Link>


            <p
              className="
                mt-5
                leading-7
              "
            >

              La plateforme simple et moderne
              pour créer, gérer et réussir
              vos événements.

            </p>


            {/* Réseaux */}

            <div
              className="
                flex
                gap-4
                mt-6
              "
            >

              <a
                href="#"
                className="hover:text-blue-500"
              >
                <FaInstagram />
              </a>


              <a
                href="#)"
                className="hover:text-blue-500"
              >
                <FaFacebook />
              </a>


              <a
                href="#"
                className="hover:text-blue-500"
              >
                <FaLinkedin />
              </a>


              <a
                href="#"
                className="hover:text-blue-500"
              >
                <FaXTwitter />
              </a>

            </div>


          </div>



          {/* Produit */}

          <div>

            <h3 className="text-gray-900 font-bold text-lg">
              Produit
            </h3>


            <ul className="mt-5 space-y-3">

              {productLinks.map((item) => (

                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-500"
                  >
                    {item}
                  </a>
                </li>

              ))}

            </ul>

          </div>



          {/* Entreprise */}

          <div>

            <h3 className="text-gray-900 font-bold text-lg">
              Entreprise
            </h3>


            <ul className="mt-5 space-y-3">

              {companyLinks.map((item) => (

                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-500"
                  >
                    {item}
                  </a>
                </li>

              ))}

            </ul>

          </div>



          {/* Support */}

          <div>

            <h3 className="text-gray-900 font-bold text-lg">
              Support
            </h3>


            <ul className="mt-5 space-y-3">

              {supportLinks.map((item) => (

                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-500"
                  >
                    {item}
                  </a>
                </li>

              ))}

            </ul>

          </div>



        </div>




        {/* Bottom */}

        <div
          className="
            border-t
            border-gray-200
            mt-16
            pt-8
            text-center
          "
        >

          © {new Date().getFullYear()} Eventia.
          Tous droits réservés.

        </div>



      </div>


    </footer>

  );
}


export default Footer;