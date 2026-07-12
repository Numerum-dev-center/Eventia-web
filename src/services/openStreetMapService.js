const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

const joinParts = (parts) =>
  parts
    .map((part) => (part ? String(part).trim() : ""))
    .filter(Boolean)
    .join(", ");

export const formatOpenStreetMapAddress = (address, fallback = "") => {
  if (!address) {
    return fallback;
  }

  const formattedAddress = joinParts([
    address.road,
    address.suburb || address.neighbourhood || address.quarter,
    address.city || address.town || address.village,
    address.state,
    address.country,
  ]);

  return formattedAddress || address.display_name || fallback;
};

const normalizePlace = (place) => ({
  id: place.place_id,
  label: place.display_name,
  formattedAddress: formatOpenStreetMapAddress(place.address, place.display_name),
  latitude: Number(place.lat),
  longitude: Number(place.lon),
  raw: place,
});

export const searchOpenStreetMapPlaces = async (query, limit = 5) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const response = await fetch(
    `${NOMINATIM_BASE_URL}?format=jsonv2&addressdetails=1&limit=${limit}&q=${encodeURIComponent(trimmedQuery)}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("La recherche OpenStreetMap a échoué.");
  }

  const results = await response.json();

  return Array.isArray(results) ? results.map(normalizePlace) : [];
};

export const geocodeOpenStreetMapPlace = async (query) => {
  const results = await searchOpenStreetMapPlaces(query, 1);

  return results[0] || null;
};