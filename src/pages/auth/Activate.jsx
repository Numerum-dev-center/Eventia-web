import { MailCheck } from "lucide-react";

function Activate() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

        <MailCheck
          size={70}
          className="mx-auto text-blue-500 mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">
          Vérifiez votre boîte mail
        </h1>

        <p className="text-gray-600">
          Un email d'activation vient de vous être envoyé.
        </p>

        <p className="text-gray-600 mt-3">
          Cliquez sur
          <strong> "Activer mon compte"</strong>
          pour finaliser votre inscription.
        </p>

      </div>
    </div>
  );
}

export default Activate;