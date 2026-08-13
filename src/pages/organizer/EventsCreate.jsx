import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Calendar, MapPin, Check } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  geocodeOpenStreetMapPlace,
  searchOpenStreetMapPlaces,
} from "../../services/openStreetMapService";
import { createEvent } from "../../services/eventsApiService";

const CATEGORIES = ["Concert", "Conférence", "Spectacle", "Marché", "Sport", "Autre"];

const formatFCFA = (value) =>
  value ? `${Number(value).toLocaleString("fr-FR")} FCFA` : "— FCFA";

function EventsCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  const [tickets, setTickets] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!image) {
      setImagePreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(image);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  useEffect(() => {
    const query = location.trim();

    if (query.length < 3) {
      return undefined;
    }

    const timeoutId = setTimeout(async () => {
      setLocationLoading(true);

      try {
        const places = await searchOpenStreetMapPlaces(query);
        setLocationSuggestions(places);
      } catch {
        setLocationSuggestions([]);
      } finally {
        setLocationLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [location]);

  const handleSelectLocation = (place) => {
    setLocation(place.formattedAddress);
    setLocationDetails(place);
    setLocationSuggestions([]);
    setErrors((currentErrors) => {
      const rest = { ...currentErrors };
      delete rest.location;
      return rest;
    });
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;

    setLocation(value);
    setLocationDetails(null);

    if (value.trim().length < 3) {
      setLocationSuggestions([]);
      setLocationLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Le titre est obligatoire";
    if (!date) newErrors.date = "La date est obligatoire";
    if (!location.trim()) newErrors.location = "Le lieu est obligatoire";
    if (!tickets) newErrors.tickets = "Le nombre de places est obligatoire";
    if (!price) newErrors.price = "Le prix du ticket est obligatoire";
    if (!startTime) newErrors.startTime = "L'heure de début est obligatoire";
    if (!endTime) newErrors.endTime = "L'heure de fin est obligatoire";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    let resolvedLocation = locationDetails;

    if (!resolvedLocation || resolvedLocation.formattedAddress !== location) {
      try {
        resolvedLocation = await geocodeOpenStreetMapPlace(location);
      } catch {
        resolvedLocation = null;
      }
    }

    if (!resolvedLocation) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        location: "Impossible de trouver ce lieu sur OpenStreetMap. Précisez davantage.",
      }));
      return;
    }

    setLocation(resolvedLocation.formattedAddress);
    setLocationDetails(resolvedLocation);

    const eventData = {
      title,
      date,
      location: resolvedLocation.formattedAddress,
      coordinates: {
        latitude: resolvedLocation.latitude,
        longitude: resolvedLocation.longitude,
      },
      capacity: Number(tickets),
      tickets,
      price,
      category,
      description,
      startTime,
      endTime,
      publish: true,
    };

    setSubmitting(true);

    try {
      const createdEvent = await createEvent(eventData);
      navigate(`/organizer/events/${createdEvent.id}`);
    } catch (err) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        submit: err?.response?.data?.message || "Impossible de créer l'événement.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const previewDate = date
    ? new Date(`${date}T${startTime || "00:00"}`).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <div className="apple-page apple-form-page">
      <header className="event-editor-header">
        <span>Événements · Nouveau</span>
        <h1>Créer un événement</h1>
        <p>Renseignez les informations utiles aux participants, configurez la billetterie puis publiez.</p>
      </header>

      {/* Repères d'étapes — indicatif, tout se soumet en une fois */}
      <div className="event-editor-steps">
        {[
          { label: "Informations", done: true },
          { label: "Billetterie", done: Boolean(tickets && price) },
          { label: "Publication", done: false },
        ].map((step, i, arr) => (
          <div key={step.label} className="flex items-center gap-3 flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  step.done
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step.done ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-xs ${step.done ? "text-gray-800 font-medium" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>
            {i < arr.length - 1 && <div className="h-0.5 flex-1 bg-gray-200 -mt-5" />}
          </div>
        ))}
      </div>

      <div className="event-editor-layout">

        <form onSubmit={handleSubmit} className="event-editor-card p-6">

          <div className="grid md:grid-cols-2 gap-5">

            {/* Photo */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-sm">Photo de couverture</label>
              <label
                className="event-cover-uploader
                  w-full h-56 border-2 border-dashed border-gray-300 rounded-2xl
                  flex flex-col items-center justify-center cursor-pointer
                  hover:border-orange-500 transition overflow-hidden text-center
                "
              >
                {!image ? (
                  <>
                    <ImagePlus size={40} className="text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">Glissez une image ou parcourez vos fichiers</p>
                    <p className="text-gray-400 text-xs mt-1">JPG, PNG — 1600×900 recommandé</p>
                  </>
                ) : (
                  <img src={imagePreviewUrl} alt="Prévisualisation" className="w-full h-full object-cover" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                L'hébergement d'image n'est pas encore branché côté serveur — l'aperçu reste local.
              </p>
            </div>

            {/* Titre */}
            <div className="md:col-span-2">
              <Input
                label="Titre de l’événement"
                placeholder="Titre de l'événement"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
            </div>

            {/* Date */}
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
            />

            <div />

            {/* Heures */}
            <Input
              label="Heure de début"
              type="time"
              placeholder="Heure de début"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              error={errors.startTime}
            />
            <Input
              label="Heure de fin"
              type="time"
              placeholder="Heure de fin"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              error={errors.endTime}
            />

            {/* Lieu */}
            <div className="md:col-span-2">
              <Input
                label="Lieu"
                placeholder="Lieu"
                value={location}
                onChange={handleLocationChange}
                icon={MapPin}
                error={errors.location}
              />

              {locationLoading && (
                <p className="text-sm text-gray-500 mt-2">
                  Recherche de lieux sur OpenStreetMap...
                </p>
              )}

              {locationSuggestions.length > 0 && (
                <div className="mt-2 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  {locationSuggestions.map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => handleSelectLocation(place)}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 transition border-b border-gray-100 last:border-b-0"
                    >
                      <span className="block font-medium text-gray-900">
                        {place.formattedAddress}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {place.latitude.toFixed(5)}, {place.longitude.toFixed(5)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Catégorie */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-sm">Catégorie</label>
              <div className="event-category-picker">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm border-2 transition ${
                      category === cat
                        ? "bg-orange-50 border-orange-500 text-orange-600 font-medium"
                        : "border-gray-300 text-gray-600 hover:border-orange-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets */}
            <Input
              label="Capacité"
              type="number"
              placeholder="Nombre de places disponibles"
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              error={errors.tickets}
            />

            {/* Prix */}
            <Input
              label="Prix par billet"
              type="number"
              placeholder="Prix du ticket (FCFA)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
            />

          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block mb-2 font-medium text-sm">Description</label>
            <textarea
              placeholder="Description de l'événement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full h-32 border-2 border-gray-300 rounded-2xl p-4
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition
              "
            />
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <Button type="button" variant="outline" fullWidth={false} onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit" fullWidth={false} disabled={submitting}>
              {submitting ? "Publication..." : "Créer l'événement"}
            </Button>
          </div>

        </form>

        {/* Aperçu public */}
        <aside className="event-preview-panel lg:sticky lg:top-6">
          <p className="event-preview-label">
            Aperçu public
          </p>
          <div className="event-preview-card">
            <div
              className="h-32 bg-gray-100"
              style={
                imagePreviewUrl
                  ? { backgroundImage: `url(${imagePreviewUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : { background: "linear-gradient(160deg, #f97316, #101a33)" }
              }
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 truncate">
                {title || "Titre de l'événement"}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5 mb-3">
                <Calendar size={13} />
                {previewDate ? `${previewDate}, ${startTime || "--:--"}` : "Date à définir"}
                {location ? ` · ${location.split(",")[0]}` : ""}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full">
                  {tickets ? `${tickets} places` : "Places à définir"}
                </span>
                <span className="font-semibold text-sm">{formatFCFA(price)}</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default EventsCreate;
