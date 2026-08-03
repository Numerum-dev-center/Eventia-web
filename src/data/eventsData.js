import eventImage from "../assets/organizer/im-land.jpg";
import concertImage from "../assets/organizer/Concert-party.jpg";
import eventosImage from "../assets/organizer/Eventos-deux.jpg";

export let eventsData = [
  {
    id: "1",
    title: "DevFest 2026",
    date: "2026-08-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: {
      latitude: 6.1319,
      longitude: 1.2228,
    },
    capacity: 1000,
    status: "PUBLISHED",
    tickets: "1000",
    orders: 246,
    ticketsSold: 682,
    checkins: 541,
    revenue: 3410000,
    category: "Technologie",
    price: 5000,
    description: "Grand évènement tech du Togo",
    image: eventImage,
  },
  {
    id: "2",
    title: "Concert Afro Night",
    date: "2026-09-05",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: {
      latitude: 6.1746,
      longitude: 1.2316,
    },
    capacity: 800,
    status: "PUBLISHED",
    tickets: "800",
    orders: 184,
    ticketsSold: 509,
    checkins: 392,
    revenue: 3817500,
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
    endTime: "17:00",
    location: "Cotonou, Bénin",
    coordinates: {
      latitude: 6.3703,
      longitude: 2.3912,
    },
    capacity: 1500,
    status: "PUBLISHED",
    tickets: "1500",
    orders: 302,
    ticketsSold: 1120,
    checkins: 903,
    revenue: 11200000,
    category: "Business",
    price: 10000,
    description: "Conférences, networking et démonstrations autour de l'innovation.",
    image: eventosImage,
  },
  {
    id: "4",
    title: "DevFest 2026",
    date: "2026-08-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: {
      latitude: 6.1319,
      longitude: 1.2228,
    },
    capacity: 1000,
    status: "PUBLISHED",
    tickets: "1000",
    orders: 246,
    ticketsSold: 682,
    checkins: 541,
    revenue: 3410000,
    category: "Technologie",
    price: 5000,
    description: "Grand évènement tech du Togo",
    image: eventImage,
  },
  {
    id: "5",
    title: "DevFest 2026",
    date: "2026-08-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: {
      latitude: 6.1319,
      longitude: 1.2228,
    },
    capacity: 1000,
    status: "PUBLISHED",
    tickets: "1000",
    orders: 246,
    ticketsSold: 682,
    checkins: 541,
    revenue: 3410000,
    category: "Technologie",
    price: 5000,
    description: "Grand évènement tech du Togo",
    image: eventImage,
  },
  {
    id: "6",
    title: "DevFest 2026",
    date: "2026-08-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: {
      latitude: 6.1319,
      longitude: 1.2228,
    },
    capacity: 1000,
    tickets: "1000",
    orders: 246,
    ticketsSold: 682,
    checkins: 541,
    revenue: 3410000,
    category: "Technologie",
    price: 5000,
    description: "Grand évènement tech du Togo",
    image: eventImage,
  },
  {
    id: "7",
    title: "DevFest 2026",
    date: "2026-08-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Lomé, Togo",
    coordinates: {
      latitude: 6.1319,
      longitude: 1.2228,
    },
    capacity: 1000,
    tickets: "1000",
    orders: 246,
    ticketsSold: 682,
    checkins: 541,
    revenue: 3410000,
    category: "Technologie",
    price: 5000,
    description: "Grand évènement tech du Togo",
    image: eventImage,
  },


  
];

export const getEvents = () => eventsData;

export const getEventById = (id) =>
  eventsData.find((event) => event.id === String(id)) || null;

export const addEvent = (event) => {
  const nextEvent = {
    ...event,
    id: String(Date.now()),
    orders: 0,
    ticketsSold: 0,
    checkins: 0,
    revenue: 0,
  };

  eventsData = [nextEvent, ...eventsData];

  return nextEvent;
};

export const updateEvent = (id, updates) => {
  eventsData = eventsData.map((event) =>
    event.id === String(id) ? { ...event, ...updates } : event
  );
  return getEventById(id);
};

export const deleteEvent = (id) => {
  eventsData = eventsData.filter((event) => event.id !== String(id));
};