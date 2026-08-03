import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";

import Button from "../ui/Button";

function NavBar() {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1330]/95 backdrop-blur-lg border-b border-white/10">

      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Sparkles size={18} className="text-white" />
          </span>
          Eventia
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 hover:text-blue-300 transition"
            >
              {item.label}
            </a>
          ))}

        </nav>

        {/* Actions */}

        <div className="hidden lg:flex items-center gap-4">

          <Link
            to="/login"
            className="font-medium text-slate-200 hover:text-blue-300"
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Inscription
          </Link>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
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

        <div className="lg:hidden bg-[#0B1330] border-t border-white/10">

          <div className="flex flex-col p-6 gap-5">

            {navItems.map((item) => (

              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-slate-300"
              >
                {item.label}
              </a>

            ))}

            <Link to="/login" className="text-slate-200">
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

export default NavBar;
