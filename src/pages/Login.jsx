import { Link } from "react-router-dom";

import eventImage from "../assets/Login-image.jpg";
import { FcGoogle } from "react-icons/fc";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SocialButton from "../components/ui/SocialButton";



function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Partie gauche */}
        <div className="relative hidden md:flex items-center justify-center overflow-hidden">
          
          
          {/* Grande forme arrondie */}
          <div className="absolute -right-32 top-0 h-full w-96 bg-white/10 rounded-l-full" />

          {/* Image */}
          <img
          src={eventImage}
          alt="Concert"
          className="w-[90%] rounded-3xl shadow-xl object-cover"
          />
          
        </div>

        {/* Partie droite */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">

            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Login
            </h1>

            <p className="text-gray-500 mb-10">
              Vous n'avez pas de compte?{" "}
              <Link
                to="/register"
                className="text-orange-500 font-medium hover:underline"
              >
                Creer un compte
              </Link>
            </p>

            <form className="space-y-6">
              <Input
                type="email"
                placeholder="Nom d'utilisateur"
                
              />

              <Input
                type="password"
                placeholder="Mot de passe"
                
              />

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-500">
                  <Input type="checkbox" />
                  Rester connecté
                </label>

                <Link
                  to="/forgot-password"
                  className="text-gray-500 hover:text-pink-500"
                >
                  Mot de passe oublié?
                </Link>
              </div>

              <Button type="submit">
                Login
              </Button>

            </form>

            {/* Réseaux sociaux */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-5">
                Ou continuer avec google
              </p>

              <div className="flex justify-center">
                <SocialButton
                icon={<FcGoogle size={24} />}
                onClick={() => alert("Google cliqué")}
                >
                  Continuer avec Google
                  </SocialButton>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;