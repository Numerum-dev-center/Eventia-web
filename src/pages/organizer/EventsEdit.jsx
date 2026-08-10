import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { fetchEventById, updateEvent } from "../../services/eventsApiService";

import {
  geocodeOpenStreetMapPlace,
  searchOpenStreetMapPlaces,
} from "../../services/openStreetMapService";

function EventsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  const [tickets, setTickets] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchEventById(id)
      .then((ev) => {
        setCurrentEvent(ev);
        setTitle(ev.title || "");
        setDate(ev.date || "");
        setLocation(ev.location || "");
        setLocationDetails(ev);
        setTickets(ev.capacity || "");
        setPrice(ev.price || "");
        setCategory(ev.category || "");
        setDescription(ev.description || "");
      })
      .catch(() => setCurrentEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

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

    if (!title.trim()) {
      newErrors.title = "Le titre est obligatoire";
    }

    if (!date) {
      newErrors.date = "La date est obligatoire";
    }

    if (!location.trim()) {
      newErrors.location = "Le lieu est obligatoire";
    }

    if (!tickets) {
      newErrors.tickets =
        "Le nombre de tickets disponibles est obligatoire";
    }

    if (!price) {
      newErrors.price =
        "Le prix du ticket est obligatoire";
    }

    if (!category.trim()) {
      newErrors.category =
        "La catégorie est obligatoire";
    }

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
        location:
          "Impossible de trouver ce lieu sur OpenStreetMap. Précisez davantage.",
      }));
      return;
    }

    setLocation(resolvedLocation.formattedAddress);
    setLocationDetails(resolvedLocation);

    try {
      await updateEvent(id, {
        title,
        date,
        location: resolvedLocation.formattedAddress,
        coordinates: {
          latitude: resolvedLocation.latitude,
          longitude: resolvedLocation.longitude,
        },
        capacity: Number(tickets) || currentEvent.capacity,
        price,
        category,
        description,
        categorieTicketId: currentEvent.categorieTicketId,
      });
      navigate(`/organizer/events/${id}`, { replace: true });
    } catch (err) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        submit: err?.response?.data?.message || "Impossible d'enregistrer les modifications.",
      }));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto text-gray-500">Chargement...</div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Modifier l'événement
        </h1>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-600">
            Cet événement est introuvable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Modifier l'événement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <Input
              placeholder="Titre"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            {errors.date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Lieu"
              value={location}
              onChange={handleLocationChange}
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

            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Nombre de tickets disponibles"
              value={tickets}
              onChange={(e) =>
                setTickets(e.target.value)
              }
            />

            {errors.tickets && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tickets}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Prix du ticket"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Catégorie"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category}
              </p>
            )}
          </div>

        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Modifier la photo
          </label>
          <p className="text-xs text-gray-400 mb-2">
            L'hébergement d'image n'est pas encore branché côté serveur — l'aperçu reste local.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
            "
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Prévisualisation"
              className="
                mt-4
                h-64
                w-full
                object-cover
                rounded-xl
                border
              "
            />
          )}

        </div>

        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="
              w-full
              h-40
              border-2
              border-gray-300
              rounded-2xl
              p-4
              outline-none
              focus:border-orange-500
            "
          />

        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
        )}

        <div className="flex gap-4 mt-8">

          <Button
            type="submit"
            className="flex-1"
          >
            Enregistrer les modifications
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Annuler
          </Button>

        </div>

      </form>

    </div>
  );
}

export default EventsEdit;
