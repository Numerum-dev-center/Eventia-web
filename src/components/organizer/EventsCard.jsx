import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { eventsData } from "../../data/eventsData";

export default function EventCard({ event = eventsData[0] }) {
  return (
    <article className="db-event-card">
      <div className="db-event-image">
        {event.image ? <img src={event.image} alt={event.title} /> : <div className="db-event-placeholder"><CalendarDays size={28} /></div>}
        <span>{event.category || "Événement"}</span>
      </div>
      <div className="db-event-body">
        <h3>{event.title}</h3>
        <p><MapPin size={13} /> {event.location || "Lieu à confirmer"}</p>
        <Link to={`/organizer/events/${event.id}`}>Voir les détails <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
}
