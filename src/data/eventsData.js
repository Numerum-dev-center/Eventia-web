import eventImage from "../assets/organizer/im-land.jpg";
import concertImage from "../assets/organizer/Concert-party.jpg";
import eventosImage from "../assets/organizer/Eventos-deux.jpg";

const STORAGE_KEY = "eventia_events_v1";

const seedEvents = [
  {
    id: "1",
    title: "DevFest 2026",
    date: "2026-08-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: { latitude: 6.1319, longitude: 1.2228 },
    capacity: 1000,
    status: "PUBLISHED",
    tickets: "1000",
    category: "Technologie",
    price: 5000,
    description: "Grand évènement tech du Togo",
    image: eventImage,
  },
  {
    id: "2",
    title: "Concert Afro Night",
    date: "2026-09-05",
    startTime: "20:00",
    endTime: "02:00",
    location: "Lomé, Togo",
    coordinates: { latitude: 6.1746, longitude: 1.2316 },
    capacity: 800,
    status: "PUBLISHED",
    tickets: "800",
    category: "Musique",
    price: 7500,
    description: "Soirée musicale festive avec plusieurs artistes invités.",
    image: concertImage,
  },
  {
    id: "3",
    title: "Summit Innovation 2026",
    date: "2026-10-18",
    startTime: "09:00",
    endTime: "18:00",
    location: "Cotonou, Bénin",
    coordinates: { latitude: 6.3703, longitude: 2.3912 },
    capacity: 1500,
    status: "PENDING",
    tickets: "1500",
    category: "Business",
    price: 10000,
    description: "Conférences, networking et démonstrations autour de l'innovation.",
    image: eventosImage,
  },
];

const loadFromStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToStorage = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(eventsData));
  } catch {
    // stockage indisponible (mode privé...) — on continue en mémoire seulement
  }
};

export let eventsData = loadFromStorage() || seedEvents;
if (!loadFromStorage()) saveToStorage();

export const getEvents = () => eventsData;

export const getPublishedEvents = () =>
  eventsData.filter((event) => event.status === "PUBLISHED");

export const getEventById = (id) =>
  eventsData.find((event) => event.id === String(id)) || null;

export const addEvent = (event) => {
  const nextEvent = {
    ...event,
    id: String(Date.now()),
    status: event.status || "DRAFT",
  };

  eventsData = [nextEvent, ...eventsData];
  saveToStorage();

  return nextEvent;
};

export const updateEvent = (id, updates) => {
  eventsData = eventsData.map((event) =>
    event.id === String(id) ? { ...event, ...updates } : event
  );
  saveToStorage();
  return getEventById(id);
};

export const deleteEvent = (id) => {
  eventsData = eventsData.filter((event) => event.id !== String(id));
  saveToStorage();
};
