import { Users, CalendarDays, Wallet, Ticket } from "lucide-react";

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Tableau de bord Administrateur
        </h1>

        <p className="text-gray-500 mt-2">
          Bienvenue sur l'espace d'administration d'Eventia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <Users className="text-blue-600 mb-3" size={32} />
          <h2 className="text-2xl font-bold">125</h2>
          <p className="text-gray-500">Utilisateurs</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <CalendarDays className="text-green-600 mb-3" size={32} />
          <h2 className="text-2xl font-bold">48</h2>
          <p className="text-gray-500">Événements</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <Ticket className="text-orange-600 mb-3" size={32} />
          <h2 className="text-2xl font-bold">1 240</h2>
          <p className="text-gray-500">Billets vendus</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <Wallet className="text-purple-600 mb-3" size={32} />
          <h2 className="text-2xl font-bold">12 500 000 FCFA</h2>
          <p className="text-gray-500">Revenus</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;