import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";


import { ImagePlus } from "lucide-react";

import {
  geocodeOpenStreetMapPlace,
  searchOpenStreetMapPlaces,
} from "../../services/openStreetMapService";
import { addEvent } from "../../data/eventsData";




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
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

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
      newErrors.price = "Le prix du ticket est obligatoire";
    }

    if (!category.trim()) {
      newErrors.category = "La catégorie est obligatoire";
    }

    if (!image) {
      newErrors.image =
        "Veuillez ajouter une image pour l'événement";
    }

    if (!startTime) {
  newErrors.startTime = "L'heure de début est obligatoire";
}

if (!endTime) {
  newErrors.endTime = "L'heure de fin est obligatoire";
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
      image: URL.createObjectURL(image),
      startTime,
      endTime,
    };

    const createdEvent = addEvent(eventData);

    navigate(`/organizer/events/${createdEvent.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Créer un événement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow"
      >

        <div className="grid md:grid-cols-2 gap-5">

          {/* Titre */}
          <div>
            <Input
              placeholder="Titre de l'événement"
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

          {/* Date */}
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






          {/* Heure de début */}
<div>
  <Input
    type="time"
    placeholder={"l'heure de debut"}
    value={startTime}
    onChange={(e) => setStartTime(e.target.value)}
  />

  {errors.startTime && (
    <p className="text-red-500 text-sm mt-1">
      {errors.startTime}
    </p>
  )}
</div>

{/* Heure de fin */}
<div>
  <Input
    type="time"
    placeholder="l'heure de fin"
    value={endTime}
    onChange={(e) => setEndTime(e.target.value)}
  />

  {errors.endTime && (
    <p className="text-red-500 text-sm mt-1">
      {errors.endTime}
    </p>
  )}
</div>

          {/* Lieu */}
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

          {/* Tickets */}
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

          {/* Prix */}
          <div>
            <Input
              type="number"
              placeholder="Prix du ticket (FCFA)"
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

          {/* Catégorie */}
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

        {/* Image */}
        <div className="mt-6">
  <label className="block mb-2 font-medium">
    Photo de l'événement
  </label>

  <label
    className="
      w-full
      h-72
      border-2
      border-dashed
      border-gray-300
      rounded-2xl
      flex
      flex-col
      items-center
      justify-center
      cursor-pointer
      hover:border-orange-500
      transition
      overflow-hidden
    "
  >
    {!image ? (
      <>
        <ImagePlus
          size={50}
          className="text-gray-400 mb-3"
        />

        <p className="text-gray-500">
          Ajouter une image
        </p>
      </>
    ) : (
      <img
        src={URL.createObjectURL(image)}
        alt="Visualisation"
        className="
          w-full
          h-full
          object-cover
        "
      />
    )}

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) =>
        setImage(e.target.files[0])
      }
    />
  </label>

  {errors.image && (
    <p className="text-red-500 text-sm mt-2">
      {errors.image}
    </p>
  )}
</div>

        {/* Description */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            placeholder="Description de l'événement"
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
              focus:border-orange-500
              outline-none
            "
          />

        </div>

        {/* Bouton */}
        <div className="mt-8">
          <Button type="submit">
            Créer l'événement
          </Button>
        </div>

      </form>

    </div>
  );
}

export default EventsCreate;