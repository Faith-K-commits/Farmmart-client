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
      className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
    >
      <img
        src={animal.image_url}
        alt={animal.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{animal.name}</h3>
      <p className="text-gray-700">Category: {animal.category}</p>
      <p className="text-gray-700">Breed: {animal.breed}</p>
      <p className="text-gray-700">Price: Ksh.{animal.price}</p>
      <p className="text-gray-500 text-sm">Age: {animal.age} years</p>
    </div>
  );
};

export default AnimalCard;
