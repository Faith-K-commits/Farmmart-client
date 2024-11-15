import React from "react";
import { useNavigate } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${animal.id}`); // Redirect to Animal Details Page
  };

  return (
    <div
      onClick={handleClick}
      className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer w-60"
    >
      <img
        src={animal.image_url}
        alt={animal.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{animal.name}</h3>
      <p className="text-gray-700">Breed: {animal.breed}</p>
      <p className="text-green-600 font-bold">Ksh.{animal.price}</p>
    </div>
  );
};

export default AnimalCard;
