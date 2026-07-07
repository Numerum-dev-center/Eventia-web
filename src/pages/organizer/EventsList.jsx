import { Link } from "react-router-dom";
import { Plus } from "lucide-react";



function EventsList() {
  const events = [
    {
      id: 1,
      title: "DevFest 2026",
      date: "12/08/2026",
      location: "Lomé",
    },
  ];

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Mes événements
        </h1>

        <Link
          to="/organizer/events/create"
          className="
            flex items-center gap-2
            bg-orange-500
            text-white
            px-4 py-2
            rounded-lg
            hover:bg-orange-600
          "
        >
          <Plus size={18} />
          Créer un événement
        </Link>
      </div>

      <div className="space-y-4">

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="font-bold text-xl">
              {event.title}
            </h2>

            <p>{event.date}</p>
            <p>{event.location}</p>

            <Link
              to={`/organizer/events/${event.id}`}
              className="text-orange-500 font-medium"
            >
              Voir détails
            </Link>
          </div>
        ))}

      </div>

    </div>
  );
}

export default EventsList;