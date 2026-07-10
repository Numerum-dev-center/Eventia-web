import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function EventDetails() {

  const { id } = useParams();

  const event = {
    title: "DevFest 2026",
    date: "12/08/2026",
    location: "Lomé",
    capacity: 1000,
    category: "Technologie",
    price: 5000,
    description:
      "Grand évènement tech du Togo",
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Détail événement
      </h1>


      

      <div className="bg-white rounded-xl p-6 shadow">

        <div className="space-y-4">

          <p>
            <strong>Titre :</strong>
            {" "}
            {event.title}
          </p>

          <p>
            <strong>Date :</strong>
            {" "}
            {event.date}
          </p>

          <p>
            <strong>Lieu :</strong>
            {" "}
            {event.location}
          </p>

          <p>
            <strong>Capacité :</strong>
            {" "}
            {event.capacity}
          </p>

          <p>
            <strong>Catégorie :</strong>
            {" "}
            {event.category}
          </p>

          <p>
            <strong>Prix :</strong>
            {" "}
            {event.price} FCFA
          </p>

          <p>
            <strong>Description :</strong>
            {" "}
            {event.description}
          </p>

        </div>

        <div className="flex gap-4 mt-8">

          <Link
            to={`/organizer/events/${id}/edit`}
            className="
              bg-blue-500
              text-white
              px-4 py-2
              rounded-lg
            "
          >
            Modifier
          </Link>

          <button
            className="
              bg-red-500
              text-white
              px-4 py-2
              rounded-lg
            "
          >
            Supprimer
          </button>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;