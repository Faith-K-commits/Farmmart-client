import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalDetails, addToCart } from "../api/animalsApi";

const AnimalDetailsPage = () => {
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
    navigate(-1); // Navigate back to the previous page
  };

  if (error) return <p>{error}</p>;
  if (!animal) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back
      </button>
      <img
        src={animal.image_url}
        alt={animal.name}
        className="w-full h-80 object-cover rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>
      <p className="text-lg">Vendor: {animal.vendor_name}</p>
      <p className="text-lg">Farm: {animal.farm_name}</p>
      <p className="text-lg">Price: Ksh.{animal.price}</p>
      <p className="text-lg">Description: {animal.description}</p>
      <p className="text-lg">Phone: {animal.phone_number}</p>
      <p className="text-lg">Email: {animal.email}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AnimalDetailsPage;
