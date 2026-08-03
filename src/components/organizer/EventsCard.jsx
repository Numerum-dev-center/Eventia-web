import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { eventsData } from "../../data/eventsData";

export default function EventCard({
  event = eventsData[0],
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
      
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-5">
        <span className="bg-blue-100 text-blue-500 text-xs px-3 py-1 rounded-full">
          {event.category}
        </span>

        <h3 className="font-bold text-lg mt-3">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <MapPin size={14} />
          <span>{event.location}</span>
        </div>

        <Link
          to={`/organizer/events/${event.id}`}
          className="
            inline-block
            mt-4
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-4
            py-2
            rounded-full
            transition
          "
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
}