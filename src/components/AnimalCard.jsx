import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/animalsApi";

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      navigate(`/animal/${animal.id}`); // Redirect to Animal Details Page
    }
  };

  const handleAddToCart = async () => {
    if (animal.available_quantity === 0) {
      toast.error("Sorry, this animal is currently out of stock.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      await addToCart(animal.id, 1);
      toast.success("Animal added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Failed to add animal to cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
      <div className="flex justify-between mt-2">
        <p className="text-green-600 font-bold">Ksh.{animal.price}</p>
        <button
          onClick={handleAddToCart}
          className="relative w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
        >
          <span className="absolute w-4 h-0.5 bg-white"></span>
          <span className="absolute h-4 w-0.5 bg-white"></span>
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;
