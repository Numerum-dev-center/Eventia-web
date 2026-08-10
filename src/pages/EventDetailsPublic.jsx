import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Ticket,
} from "lucide-react";

import NavBar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { fetchEventById, reserverBillets } from "../services/eventsApiService";
import { getStoredAuth } from "../services/authSession";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

function EventDetailsPublic() {
  const { id } = useParams();
  const auth = getStoredAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState(auth?.user?.email || "");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    fetchEventById(id)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF1F6]">
        <NavBar />
        <div className="flex items-center justify-center gap-2 pt-40 text-gray-500">
          <Loader2 size={18} className="animate-spin" />
          Chargement de l'événement...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#EEF1F6]">
        <NavBar />
        <div className="max-w-3xl mx-auto px-6 pt-40 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Événement introuvable</h1>
          <Link to="/events" className="text-orange-500 hover:underline mt-4 inline-block">
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  const remaining = event.remaining;

  const handleReserve = async (e) => {
    e.preventDefault();
    setError("");

    if (!buyerName.trim() || !buyerEmail.trim()) {
      setError("Merci de renseigner votre nom et votre email.");
      return;
    }
    if (quantity < 1) {
      setError("La quantité doit être d'au moins 1 billet.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await reserverBillets({
        categorieTicketId: event.categorieTicketId,
        quantite: quantity,
        buyerName: buyerName.trim(),
        buyerEmail: buyerEmail.trim(),
        buyerTelephone: buyerPhone.trim() || undefined,
      });
      setConfirmation(result);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Impossible de finaliser la réservation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="min-h-screen bg-[#EEF1F6]">
        <NavBar />
        <div className="max-w-lg mx-auto px-6 pt-32 pb-20">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-5">
              <CheckCircle2 size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Réservation confirmée</h1>
            <p className="text-gray-500 mt-2">
              {confirmation.billets.length} billet(s) pour <b>{event.title}</b>.
            </p>

            <div className="mt-6 space-y-2 text-left">
              {confirmation.billets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-orange-700">
                    <Ticket size={16} />
                    {ticket.codeUniqueCrypto}
                  </span>
                  <span className="text-xs text-orange-500">Valide</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-5">
              Conservez ces codes — ils seront scannés à l'entrée de l'événement.
            </p>

            <Button as={Link} to="/events" variant="outline" fullWidth={false} className="mt-8 px-6">
              Voir d'autres événements
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF1F6]">
      <NavBar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500">
          <ArrowLeft size={16} />
          Tous les événements
        </Link>

        {event.image && (
          <div className="mt-4 rounded-2xl overflow-hidden h-72">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-8">
          <div>
            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              {event.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">{event.title}</h1>

            <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="text-orange-500" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                {event.startTime} — {event.endTime}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                {event.location}
              </span>
            </div>

            <p className="mt-6 text-gray-600 leading-7">{event.description}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
            <p className="text-2xl font-bold text-gray-900">
              {Number(event.price).toLocaleString("fr-FR")} FCFA
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {remaining > 0 ? `${remaining} billet(s) restant(s)` : "Complet"}
            </p>

            {remaining > 0 ? (
              <form onSubmit={handleReserve} className="mt-5 space-y-3">
                {error && (
                  <div className="rounded-lg bg-red-50 text-red-600 p-3 text-sm">{error}</div>
                )}

                <Input
                  placeholder="Nom complet"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                />
                <Input
                  placeholder="Téléphone (optionnel)"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Quantité"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(remaining, Number(e.target.value) || 1)))
                  }
                />

                <Button type="submit" disabled={submitting}>
                  {submitting ? "Réservation..." : `Réserver ${quantity} billet(s)`}
                </Button>
              </form>
            ) : (
              <p className="mt-5 text-sm text-gray-500">
                Cet événement affiche complet, plus de billets disponibles.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EventDetailsPublic;
