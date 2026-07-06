import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function EventsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Simulation des données récupérées
  const [title, setTitle] = useState("DevFest 2026");
  const [date, setDate] = useState("2026-08-12");
  const [location, setLocation] = useState("Lomé");
  const [tickets, setTickets] = useState("1000");
  const [price, setPrice] = useState("5000");
  const [category, setCategory] = useState("Technologie");
  const [description, setDescription] = useState(
    "Grand événement dédié au numérique et à l'innovation."
  );

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Le titre est obligatoire";
    }

    if (!date) {
      newErrors.date = "La date est obligatoire";
    }

    if (!location.trim()) {
      newErrors.location = "Le lieu est obligatoire";
    }

    if (!tickets) {
      newErrors.tickets =
        "Le nombre de tickets disponibles est obligatoire";
    }

    if (!price) {
      newErrors.price =
        "Le prix du ticket est obligatoire";
    }

    if (!category.trim()) {
      newErrors.category =
        "La catégorie est obligatoire";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const updatedEvent = {
      id,
      title,
      date,
      location,
      tickets,
      price,
      category,
      description,
      image,
    };

    console.log(updatedEvent);

    alert("Événement modifié avec succès !");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Modifier l'événement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <Input
              placeholder="Titre"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            {errors.date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Lieu"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Nombre de tickets disponibles"
              value={tickets}
              onChange={(e) =>
                setTickets(e.target.value)
              }
            />

            {errors.tickets && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tickets}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Prix du ticket"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Catégorie"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category}
              </p>
            )}
          </div>

        </div>

        <div className="mt-6">
            

          <label className="block mb-2 font-medium">
            Modifier la photo
          </label>

          <input

            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
            "            
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="
            {URL.createObjectURL(image)}Prévisualisation"
              className="
                mt-4
                h-64
                w-full
                object-cover
                rounded-xl
                border
              "
            />
          )}

        </div>

        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="
              w-full
              h-40
              border-2
              border-gray-500
              rounded-2xl
              p-4
              outline-none
              focus:border-orange-500
            "
          />

        </div>

        <div className="flex gap-4 mt-8">

          <Button
            type="submit"
            className="flex-1"
          >
            Enregistrer les modifications
          </Button>

          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500"
          >
            Annuler
          </Button>

        </div>

      </form>

    </div>
  );
}

export default EventsEdit;