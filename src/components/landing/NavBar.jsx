import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Button from "../ui/Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Fonctionnalités",
      href: "#features",
    },
    {
      label: "Comment ça marche",
      href: "#how-it-works",
    },
    {
      label: "Événements",
      href: "#events",
    },


    {
      label: "Témoignages",
      href: "#testimonials",
    },



    {
      label: "Questions fréquentes",
      href: "#faq",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F4EC]/90 backdrop-blur-lg border-b border-gray-200">

      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-orange-500"
        >
          Eventia
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              text-sm
              className="text-gray-700 hover:text-orange-500 transition"
            >
              {item.label}
            </a>
          ))}

        </nav>

        {/* Actions */}

        <div className="hidden lg:flex items-center gap-4">

          <Link
            to="/login"
            className="font-medium hover:text-orange-500"
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600"
          >
            Inscription
          </Link>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {isOpen && (

        <div className="lg:hidden bg-[#F8F4EC] border-t">

          <div className="flex flex-col p-6 gap-5">

            {navItems.map((item) => (

              <a
                key={item.label}
                href={item.href}
                text-sm
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                {item.label}
              </a>

            ))}

            <Link to="/login">
              Connexion
            </Link>

            <Button
              as={Link}
              to="/register"
            >
              Commencer
            </Button>

          </div>

        </div>

      )}

    </header>
  );
}

export default Navbar;