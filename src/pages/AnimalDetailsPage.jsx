import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalDetails, addToCart, removeFromCart } from "../api/animalsApi";
import { toast } from "react-toastify";

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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setAvailableQuantity((prevQuantity) => prevQuantity - 1);

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
      setAvailableQuantity((prevQuantity) => prevQuantity + 1);
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

  const handleRemoveFromCart = async () => {
    try {
      const response = await removeFromCart(animal.id);
      if (response.success) {
        setAvailableQuantity((prevQuantity) => prevQuantity + 1);
        toast.success("Animal removed from cart successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Error removing from cart:", response.error);
        toast.error("Failed to remove animal from cart.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove animal from cart.", {
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

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) return <p>{error}</p>;
  if (!animal) return <p>Loading...</p>;

  return (
    <div className="animal-details-page p-8 bg-gray-100 flex flex-col md:flex-row items-start space-x-8">
      {/* Animal Image */}
      <div className="animal-image flex-shrink-0">
        <img
          src={animal.image_url}
          alt={animal.name}
          className="w-64 h-64 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>
        <p className="text-lg text-gray-700">Vendor: {animal.vendor_name}</p>
        <p className="text-lg text-gray-700">Farm: {animal.farm_name}</p>
        <p className="text-lg text-gray-700">Phone: {animal.phone_number}</p>
        <p className="text-lg text-gray-700">Email: {animal.email}</p>
        <div className="actions flex space-x-4 mt-6">
          <p className="text-2xl font-semibold text-green-600 mt-2">
            Ksh.{animal.price}
          </p>
          <p className="text-2xl font-semibold text-gray-600 mt-2">
            Available Quantity: {availableQuantity}
          </p>
        </div>
        <p className="text-gray-600 my-4">{animal.description}</p>

        {/* Actions */}
        <div className="actions flex space-x-4 mt-6 items-center">
          <button
            onClick={handleRemoveFromCart}
            className="relative w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
          >
            <span className="absolute w-4 h-0.5 bg-white"></span>
            {/* <span className="absolute h-4 w-0.5 bg-white"></span> */}
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
