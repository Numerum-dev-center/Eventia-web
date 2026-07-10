import { useState } from "react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";


import { ImagePlus } from "lucide-react";




function EventsCreate() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [tickets, setTickets] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
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
      newErrors.price = "Le prix du ticket est obligatoire";
    }

    if (!category.trim()) {
      newErrors.category = "La catégorie est obligatoire";
    }

    if (!image) {
      newErrors.image =
        "Veuillez ajouter une image pour l'événement";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const eventData = {
      title,
      date,
      location,
      tickets,
      price,
      category,
      description,
      image,
    };

    console.log(eventData);

    alert("Événement créé avec succès !");
  };

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Créer un événement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow"
      >

        <div className="grid md:grid-cols-2 gap-5">

          {/* Titre */}
          <div>
            <Input
              placeholder="Titre de l'événement"
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

          {/* Date */}
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

          {/* Lieu */}
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

          {/* Tickets */}
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

          {/* Prix */}
          <div>
            <Input
              type="number"
              placeholder="Prix du ticket (FCFA)"
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

          {/* Catégorie */}
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

        {/* Image */}
        <div className="mt-6">
  <label className="block mb-2 font-medium">
    Photo de l'événement
  </label>

  <label
    className="
      w-full
      h-72
      border-2
      border-dashed
      border-gray-300
      rounded-2xl
      flex
      flex-col
      items-center
      justify-center
      cursor-pointer
      hover:border-orange-500
      transition
      overflow-hidden
    "
  >
    {!image ? (
      <>
        <ImagePlus
          size={50}
          className="text-gray-400 mb-3"
        />

        <p className="text-gray-500">
          Ajouter une image
        </p>
      </>
    ) : (
      <img
        src={URL.createObjectURL(image)}
        alt="Visualisation"
        className="
          w-full
          h-full
          object-cover
        "
      />
    )}

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) =>
        setImage(e.target.files[0])
      }
    />
  </label>

  {errors.image && (
    <p className="text-red-500 text-sm mt-2">
      {errors.image}
    </p>
  )}
</div>

        {/* Description */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            placeholder="Description de l'événement"
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
              focus:border-orange-500
              outline-none
            "
          />

        </div>

        {/* Bouton */}
        <div className="mt-8">
          <Button type="submit">
            Créer l'événement
          </Button>
        </div>

      </form>

    </div>
  );
}

export default EventsCreate;