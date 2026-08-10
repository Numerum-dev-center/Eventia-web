import api from "./api/axios";

// Traduit un événement backend (titre/dateDebut/.../categoriesTickets[])
// vers le format "plat" que les pages web utilisent déjà (title/date/price/capacity...).
// Chaque événement créé depuis le web n'a qu'une seule catégorie de billet
// ("Standard"), donc cette simplification reste fidèle à la réalité créée ici.
const mapEvent = (ev) => {
  const categorie = ev.categoriesTickets?.[0];
  const start = ev.dateDebut ? new Date(ev.dateDebut) : null;
  const end = ev.dateFin ? new Date(ev.dateFin) : null;

  return {
    id: ev.id,
    title: ev.titre,
    description: ev.description,
    category: ev.categorie,
    location: ev.lieuNom,
    address: ev.adresse,
    coordinates:
      ev.latitude && ev.longitude
        ? { latitude: Number(ev.latitude), longitude: Number(ev.longitude) }
        : null,
    date: start ? start.toISOString().slice(0, 10) : "",
    startTime: start ? start.toISOString().slice(11, 16) : "",
    endTime: end ? end.toISOString().slice(11, 16) : "",
    image: ev.imageBanniere,
    status:
      ev.statut === "Publié" ? "PUBLISHED" : ev.statut === "Annulé" ? "CANCELLED" : "DRAFT",
    price: categorie ? Number(categorie.prix) : 0,
    capacity: categorie ? categorie.quantiteTotale : 0,
    remaining: categorie ? categorie.quantiteDisponible : 0,
    categorieTicketId: categorie?.id ?? null,
  };
};

// --- Public ---

export const fetchPublishedEvents = async () => {
  const { data } = await api.get("/evenement");
  return data.map(mapEvent);
};

export const fetchEventById = async (id) => {
  const { data } = await api.get(`/evenement/${id}`);
  return mapEvent(data);
};

export const reserverBillets = async ({
  categorieTicketId,
  quantite,
  buyerName,
  buyerEmail,
  buyerTelephone,
}) => {
  const { data } = await api.post("/evenement/reserver", {
    categorieTicketId,
    quantite,
    buyerName,
    buyerEmail,
    buyerTelephone,
  });
  return data;
};

// --- Organisateur ---

export const fetchMyEvents = async () => {
  const { data } = await api.get("/organizer/events");
  return data.map(mapEvent);
};

export const createEvent = async (payload) => {
  const { data: ev } = await api.post("/organizer/events", {
    titre: payload.title,
    description: payload.description,
    categorie: payload.category,
    lieuNom: payload.location,
    adresse: payload.address,
    latitude: payload.coordinates?.latitude?.toString(),
    longitude: payload.coordinates?.longitude?.toString(),
    dateDebut: `${payload.date}T${payload.startTime || "00:00"}:00`,
    dateFin: `${payload.date}T${payload.endTime || "23:59"}:00`,
    imageBanniere: payload.image || undefined,
  });

  // Une seule catégorie de billet "Standard" par événement créé depuis le web
  await api.post(`/organizer/events/${ev.id}/categories`, {
    nom: "Standard",
    prix: Number(payload.price) || 0,
    quantiteTotale: Number(payload.tickets || payload.capacity) || 1,
  });

  if (payload.publish) {
    await api.post(`/organizer/events/${ev.id}/publish`);
  }

  return fetchEventById(ev.id);
};

export const updateEvent = async (id, payload) => {
  await api.patch(`/organizer/events/${id}`, {
    titre: payload.title,
    description: payload.description,
    categorie: payload.category,
    lieuNom: payload.location,
    adresse: payload.address,
    latitude: payload.coordinates?.latitude?.toString(),
    longitude: payload.coordinates?.longitude?.toString(),
    dateDebut: payload.date ? `${payload.date}T${payload.startTime || "00:00"}:00` : undefined,
    dateFin: payload.date ? `${payload.date}T${payload.endTime || "23:59"}:00` : undefined,
  });

  if (payload.categorieTicketId && (payload.price !== undefined || payload.capacity !== undefined)) {
    await api.patch(`/categorie-ticket/${payload.categorieTicketId}`, {
      prix: payload.price !== undefined ? Number(payload.price) : undefined,
      quantiteTotale: payload.capacity !== undefined ? Number(payload.capacity) : undefined,
    });
  }

  return fetchEventById(id);
};

export const publishEvent = async (id) => {
  await api.post(`/organizer/events/${id}/publish`);
};

export const deleteEvent = async (id) => {
  await api.delete(`/organizer/events/${id}`);
};

export const fetchParticipants = async (eventId) => {
  const { data } = await api.get(`/organizer/events/${eventId}/billets`);
  return data;
};

export const fetchEventFinance = async (eventId) => {
  const { data } = await api.get(`/organizer/events/${eventId}/finance`);
  return data;
};

export const fetchOrganizerFinance = async () => {
  const { data } = await api.get("/organizer/finance");
  return data;
};

export const fetchOrganizerDashboard = async () => {
  const { data } = await api.get("/organizer/dashboard");
  return data;
};

export const scanTicket = async ({ codeUniqueCrypto, evenementId, localisation }) => {
  const { data } = await api.post("/organizer/scan", {
    codeUniqueCrypto,
    evenementId,
    localisation,
  });
  return data;
};

export const fetchAccessLog = async (eventId) => {
  const { data } = await api.get(`/organizer/events/${eventId}/acces`);
  return data;
};

// --- Admin ---

export const fetchAllEventsAdmin = async () => {
  const { data } = await api.get("/admin/events");
  return data.map(mapEvent);
};

const ADMIN_STATUS_MAP = {
  PUBLISHED: "Publié",
  CANCELLED: "Annulé",
  DRAFT: "Brouillon",
  TERMINE: "Terminé",
};

export const setEventStatusAdmin = async (id, statut) => {
  await api.patch(`/admin/events/${id}/status`, {
    statut: ADMIN_STATUS_MAP[statut] || statut,
  });
};

export const fetchAdminDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};

export const fetchAdminReports = async () => {
  const { data } = await api.get("/admin/reports");
  return data;
};

export const fetchAdminCommissions = async () => {
  const { data } = await api.get("/admin/commissions");
  return data;
};

export const fetchAdminReversements = async () => {
  const { data } = await api.get("/admin/reversements-orga");
  return data;
};

export const fetchAllTicketsAdmin = async () => {
  const { data } = await api.get("/admin/billets");
  return data;
};

export const fetchAuditLog = async (params = {}) => {
  const { data } = await api.get("/admin/audit-log", { params });
  return data;
};
