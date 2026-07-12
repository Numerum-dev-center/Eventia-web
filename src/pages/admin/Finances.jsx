import { Wallet } from "lucide-react";

function AdminFinances() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Wallet size={32} className="text-green-600" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Finances
          </h1>

          <p className="text-gray-500">
            Revenus, commissions et reversements.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold">Revenus</h2>
            <p className="text-2xl font-bold mt-2">
              12 500 000 FCFA
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold">Commissions</h2>
            <p className="text-2xl font-bold mt-2">
              1 250 000 FCFA
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold">Reversements</h2>
            <p className="text-2xl font-bold mt-2">
              11 250 000 FCFA
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminFinances;