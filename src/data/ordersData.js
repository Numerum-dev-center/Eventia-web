import { getEventById, getEvents } from "./eventsData";

const ORDERS_KEY = "eventia_orders_v1";
const TICKETS_KEY = "eventia_tickets_v1";
const SCANS_KEY = "eventia_scans_v1";

const load = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stockage indisponible — on continue en mémoire seulement
  }
};

let orders = load(ORDERS_KEY, []);
let tickets = load(TICKETS_KEY, []);
let scans = load(SCANS_KEY, []);

const persistOrders = () => save(ORDERS_KEY, orders);
const persistTickets = () => save(TICKETS_KEY, tickets);
const persistScans = () => save(SCANS_KEY, scans);

const generateCode = () =>
  Math.random().toString(36).slice(2, 6).toUpperCase() +
  "-" +
  Math.random().toString(36).slice(2, 6).toUpperCase();

export const getOrdersByEvent = (eventId) =>
  orders.filter((order) => order.eventId === String(eventId));

export const getTicketsByEvent = (eventId) =>
  tickets.filter((ticket) => ticket.eventId === String(eventId));

export const getTicketByCode = (code) =>
  tickets.find((ticket) => ticket.code === code.trim().toUpperCase()) || null;

export const getScansByEvent = (eventId) =>
  scans
    .filter((scan) => scan.eventId === String(eventId))
    .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));

export const createOrder = ({ eventId, buyerName, buyerEmail, buyerPhone, quantity }) => {
  const event = getEventById(eventId);
  if (!event) throw new Error("Événement introuvable.");

  const qty = Math.max(1, Number(quantity) || 1);
  const remaining = getRemainingTickets(eventId);
  if (qty > remaining) {
    throw new Error(`Il ne reste que ${remaining} billet(s) disponible(s).`);
  }

  const order = {
    id: String(Date.now()),
    eventId: String(eventId),
    buyerName,
    buyerEmail,
    buyerPhone: buyerPhone || "",
    quantity: qty,
    amount: qty * Number(event.price || 0),
    paymentStatus: "PAYE",
    purchasedAt: new Date().toISOString(),
  };

  orders = [order, ...orders];
  persistOrders();

  const newTickets = Array.from({ length: qty }, () => ({
    id: `${order.id}-${Math.random().toString(36).slice(2, 8)}`,
    orderId: order.id,
    eventId: String(eventId),
    code: generateCode(),
    status: "VALIDE",
    holderName: buyerName,
    scannedAt: null,
  }));

  tickets = [...tickets, ...newTickets];
  persistTickets();

  return { order, tickets: newTickets };
};

export const getRemainingTickets = (eventId) => {
  const event = getEventById(eventId);
  if (!event) return 0;
  const sold = getTicketsByEvent(eventId).length;
  return Math.max(0, Number(event.capacity || 0) - sold);
};

export const getEventStats = (eventId) => {
  const eventOrders = getOrdersByEvent(eventId);
  const eventTickets = getTicketsByEvent(eventId);
  const event = getEventById(eventId);

  const ticketsSold = eventTickets.length;
  const revenue = eventOrders.reduce((sum, order) => sum + order.amount, 0);
  const checkins = eventTickets.filter((t) => t.status === "UTILISE").length;
  const capacity = Number(event?.capacity || 0);

  return {
    ordersCount: eventOrders.length,
    ticketsSold,
    revenue,
    checkins,
    remaining: Math.max(0, capacity - ticketsSold),
    occupancyRate: capacity > 0 ? Math.round((ticketsSold / capacity) * 100) : 0,
  };
};

export const validateTicket = (code, { location = "Entrée principale" } = {}) => {
  const ticket = getTicketByCode(code);
  const timestamp = new Date().toISOString();

  if (!ticket) {
    const scan = {
      id: String(Date.now()),
      eventId: null,
      ticketId: null,
      success: false,
      message: "Billet introuvable — code invalide.",
      location,
      scannedAt: timestamp,
    };
    scans = [scan, ...scans];
    persistScans();
    return { ok: false, message: scan.message };
  }

  if (ticket.status === "UTILISE") {
    const scan = {
      id: String(Date.now()),
      eventId: ticket.eventId,
      ticketId: ticket.id,
      success: false,
      message: `Billet déjà utilisé le ${new Date(ticket.scannedAt).toLocaleString("fr-FR")}.`,
      location,
      scannedAt: timestamp,
    };
    scans = [scan, ...scans];
    persistScans();
    return { ok: false, message: scan.message };
  }

  tickets = tickets.map((t) =>
    t.id === ticket.id ? { ...t, status: "UTILISE", scannedAt: timestamp } : t
  );
  persistTickets();

  const scan = {
    id: String(Date.now()),
    eventId: ticket.eventId,
    ticketId: ticket.id,
    success: true,
    message: `Billet validé — ${ticket.holderName}.`,
    location,
    scannedAt: timestamp,
  };
  scans = [scan, ...scans];
  persistScans();

  return { ok: true, message: scan.message, ticket };
};

export const getAllOrders = () => orders;
export const getAllTickets = () => tickets;

const MONTH_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

const PLATFORM_COMMISSION_RATE = 0.1;

export const getPlatformFinances = () => {
  const revenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const commissions = Math.round(revenue * PLATFORM_COMMISSION_RATE);
  const reversements = revenue - commissions;
  return { revenue, commissions, reversements };
};

export const getOrganizerOverview = () => {
  const events = getEvents();
  const eventIds = events.map((e) => e.id);
  const relevantOrders = orders.filter((o) => eventIds.includes(o.eventId));
  const relevantTickets = tickets.filter((t) => eventIds.includes(t.eventId));

  const revenue = relevantOrders.reduce((sum, o) => sum + o.amount, 0);
  const ticketsSold = relevantTickets.length;
  const checkins = relevantTickets.filter((t) => t.status === "UTILISE").length;
  const buyers = new Set(relevantOrders.map((o) => o.buyerEmail)).size;

  const byMonth = new Map();
  relevantOrders.forEach((order) => {
    const date = new Date(order.purchasedAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const existing = byMonth.get(key) || { revenue: 0, users: 0, checkins: 0, monthIndex: date.getMonth() };
    existing.revenue += order.amount;
    existing.users += order.quantity;
    byMonth.set(key, existing);
  });

  const chart = Array.from(byMonth.values())
    .sort((a, b) => a.monthIndex - b.monthIndex)
    .map((entry) => ({
      month: MONTH_LABELS[entry.monthIndex],
      revenue: entry.revenue,
      users: entry.users,
      checkins: entry.checkins,
      notes: 0,
    }));

  return {
    revenue,
    users: buyers,
    checkins,
    tickets: ticketsSold,
    events: events.length,
    notes: 0,
    chart: chart.length > 0 ? chart : [{ month: "—", revenue: 0, users: 0, checkins: 0, notes: 0 }],
  };
};
