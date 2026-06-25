import { Link } from "react-router-dom";

import eventImage from "../assets/im-land.jpg";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Partie gauche */}
        <div className="relative hidden md:flex items-center justify-center overflow-hidden">

          <div className="absolute -right-32 top-0 h-full w-96 bg-white/10 rounded-l-full" />

          <img
            src={eventImage}
            alt="Concert"
            className="w-[90%] rounded-3xl shadow-xl object-cover"
          />
        </div>

        {/* Partie droite */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Créer un compte
            </h2>
            <p className="text-gray-500 mb-10">
              Vous avez dejà un compte?{" "}
              <Link
                to="/Login"
                className="text-orange-500 font-medium hover:underline"
              >
                Se connecter
              </Link>
            </p>
            

            

            <form className="space-y-5">

              <Input
                type="text"
                placeholder="Nom complet"
              />

              <Input
                type="email"
                placeholder="Email"
              />

              <Input
                type="password"
                placeholder="Mot de passe"
              />

              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
              />

              <Button type="submit">
                S'inscrire
              </Button>

            </form>

            
          

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;