import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import eventImage from "../../assets/organizer/im-land.jpg";

export default function EventCard({
  event = {
    id: 1,
    title: "Concert Afro Night",
    location: "Lomé, Togo",
    category: "Musique",
    image: eventImage,
  },
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
        <span className="bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full">
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
            bg-orange-500
            hover:bg-orange-600
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