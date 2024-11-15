import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalDetails, addToCart } from "../api/animalsApi";

function AnimalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const data = await getAnimalDetails(id);
        setAnimal(data);
      } catch (error) {
        setError("Failed to load animal details");
      }
    };
    fetchAnimalDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(animal.id, 1);
      alert("Animal added to cart successfully!");
    } catch (error) {
      alert("Failed to add animal to cart.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) return <p>{error}</p>;
  if (!animal) return <p>Loading...</p>;

  return (
    <div className="animal-details-page p-8 bg-gray-100 flex flex-co md:flex-row items-start space-x-8">
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
        <p className="text-2xl font-semibold text-green-600 mt-2">
          Ksh.{animal.price}
        </p>
        <p className="text-gray-600 my-4">{animal.description}</p>

        {/* Actions */}
        <div className="actions flex space-x-4 mt-6">
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-orange-300"
          >
            ← Back
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetailsPage;
