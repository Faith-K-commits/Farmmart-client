// src/pages/AnimalDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalDetails, addToCart, removeFromCart } from "../api/animalsApi";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaEnvelope, FaStore, FaTractor } from "react-icons/fa";

function AnimalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const data = await getAnimalDetails(id);
        setAnimal(data);
        setAvailableQuantity(data.available_quantity);
      } catch (error) {
        setError("Failed to load animal details");
      }
    };
    fetchAnimalDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (availableQuantity === 0) {
      toast.error("Sorry, this animal is currently out of stock.", {
        position: "top-right",
      });
      return;
    }
    setAvailableQuantity((prevQuantity) => prevQuantity - 1);

    try {
      await addToCart(animal.id, 1);
      toast.success("Animal added to cart successfully!", {
        position: "top-right",
      });
    } catch (error) {
      setAvailableQuantity((prevQuantity) => prevQuantity + 1);
      toast.error("Failed to add animal to cart.", { position: "top-right" });
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await removeFromCart(animal.id);
      if (response.success) {
        setAvailableQuantity((prevQuantity) => prevQuantity + 1);
        toast.success("Animal removed from cart successfully!", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to remove animal from cart.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to remove animal from cart.", {
        position: "top-right",
      });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) return <p>{error}</p>;
  if (!animal) return <p>Loading...</p>;

  return (
    <div className="animal-details-page p-8 bg-gray-100 flex flex-col md:flex-row items-start space-x-8 animate-fadeIn">
      {/* Animal Image */}
      <div className="animal-image flex-shrink-0">
        <img
          src={animal.image_url}
          alt={animal.name}
          className="w-80 h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Product Info */}
      <div className="product-info bg-white p-6 rounded-lg shadow-lg border w-full md:w-2/3">
        <h1 className="text-4xl font-bold mb-4">{animal.name}</h1>

        {/* Vendor and Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="info-item flex items-center text-gray-700">
            <FaTractor className="mr-2 text-orange-500" />
            <p>Farm: {animal.farm_name}</p>
          </div>
          <div className="info-item flex items-center text-gray-700">
            <FaStore className="mr-2 text-orange-500" />
            <p>Vendor: {animal.vendor_name}</p>
          </div>
          <div className="info-item flex items-center text-gray-700">
            <FaPhoneAlt className="mr-2 text-green-500" />
            <p>Phone: {animal.phone_number}</p>
          </div>
          <div className="info-item flex items-center text-gray-700">
            <FaEnvelope className="mr-2 text-blue-500" />
            <p>Email: {animal.email}</p>
          </div>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-semibold text-green-600">
            Price: Ksh.{animal.price}
          </p>
          {availableQuantity > 0 ? (
            <p className="text-2xl font-semibold text-gray-600">
              Available: {availableQuantity}
            </p>
          ) : (
            <p className="text-xl font-semibold text-red-600">Out of Stock</p>
          )}
        </div>

        {/* Age and Description */}
        <p className="text-lg text-gray-700 mb-4">Age: {animal.age} years</p>
        <p className="text-gray-600 mb-6">{animal.description}</p>

        {/* Actions */}
        <div className="actions flex space-x-4 mt-6 items-center">
          <button
            onClick={handleRemoveFromCart}
            className="relative w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
          >
            <span className="absolute w-4 h-0.5 bg-white"></span>
          </button>
          <button
            onClick={handleAddToCart}
            className="relative w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
          >
            <span className="absolute w-4 h-0.5 bg-white"></span>
            <span className="absolute h-4 w-0.5 bg-white"></span>
          </button>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-orange-300"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetailsPage;
