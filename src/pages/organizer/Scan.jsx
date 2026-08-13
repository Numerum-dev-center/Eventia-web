import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, ScanLine, XCircle } from "lucide-react";

import { scanTicket } from "../../services/eventsApiService";

function Scan() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setScanning(true);
    try {
      const outcome = await scanTicket({
        codeUniqueCrypto: code.trim(),
        evenementId: id,
        localisation: "Entrée principale",
      });
      setResult(outcome);
    } catch (err) {
      setResult({
        ok: false,
        message: err?.response?.data?.message || "Erreur lors de la vérification.",
      });
    } finally {
      setScanning(false);
      setCode("");
    }
  };

  return (
    <div className="apple-page apple-scan-page">
      <Link
        to={`/organizer/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-300"
      >
        <ArrowLeft size={16} />
        Retour à l'événement
      </Link>

      <div className="max-w-md mx-auto mt-10 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-6">
          <ScanLine size={28} className="text-orange-300" />
        </div>
        <h1 className="text-2xl font-bold">Contrôle d'accès</h1>
        <p className="text-slate-400 mt-2 text-sm">
          Scannez le QR code du billet ou saisissez son code manuellement.
        </p>

        <button
          type="button"
          className="mt-8 w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/20 rounded-2xl py-14 text-slate-400 hover:border-orange-400 hover:text-orange-300 transition"
        >
          <Camera size={32} />
          <span className="text-sm font-medium">Activer la caméra</span>
        </button>

        <form onSubmit={handleCheck} className="mt-6 flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Saisir le code du billet"
            className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400"
          />
          <button
            type="submit"
            disabled={scanning}
            className="bg-orange-500 hover:bg-orange-600 transition rounded-xl px-5 font-semibold text-sm disabled:opacity-50"
          >
            {scanning ? "..." : "Vérifier"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 flex items-center gap-3 rounded-xl p-4 text-left text-sm ${
              result.ok ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-200"
            }`}
          >
            {result.ok ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scan;
