import { Users } from "lucide-react";

function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users size={32} className="text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-500">
            Gérez les administrateurs, organisateurs et participants.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Cette page permettra de :
        </p>

        <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Afficher tous les utilisateurs</li>
          <li>Créer un utilisateur</li>
          <li>Modifier un utilisateur</li>
          <li>Supprimer un utilisateur</li>
          <li>Changer le rôle d'un utilisateur</li>
        </ul>
      </div>
    </div>
  );
}

export default UsersPage;