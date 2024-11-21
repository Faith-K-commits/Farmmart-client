import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import farmBanner from "../assets/herd-of-afrikaner-cattle-website-header.jpg";
import highlightsBanner from "../assets/bighorn-sheep-farm-animal-header.jpg";
import highlightsBanner2 from "../assets/catchy-hen-grass-header.jpg";
const Home = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [refreshAnimation, setRefreshAnimation] = useState(false);
  const navigate = useNavigate();

  // Function to fetch random featured animals
  const fetchFeaturedAnimals = async () => {
    try {
      const response = await fetch(
        "https://farmmart-tvco.onrender.com/animals/featured"
      );
      if (!response.ok) throw new Error("Failed to fetch featured animals.");
      const data = await response.json();

      // Trigger animation before updating the state
      setRefreshAnimation(false);
      setTimeout(() => {
        setFeaturedAnimals(data.featured_animals);
        setRefreshAnimation(true);
      }, 200); // Delay to play animation
    } catch (error) {
      console.error(error);
      toast.error("Unable to load featured animals.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Fetch featured animals on component mount and set up auto-refresh
  useEffect(() => {
    fetchFeaturedAnimals();
    const intervalId = setInterval(() => {
      fetchFeaturedAnimals();
    }, 15000); // Auto-refresh every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Navigate to animals page
  const handleBrowseAnimals = () => {
    navigate("/animals");
    toast.info("Browsing animals...", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="home-page min-h-screen  flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="hero-section w-full h-96 bg-cover bg-center text-gray-200 flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${farmBanner})` }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to FarmMart</h1>
        <p className="text-lg mb-6">
          Connecting farmers directly to buyers, cutting out the middlemen.
        </p>
        <button
          onClick={handleBrowseAnimals}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Browse Animals
        </button>
      </div>

      {/* Feature Highlights Section */}
      <div className="features-section my-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          {/* <img
            src="/assets/secure-payments.svg"
            alt="Secure Payments"
            className="w-12 h-12 mb-4"
          /> */}
          <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
          <p className="text-gray-600 text-center">
            Pay confidently with our secure and reliable payment system.
          </p>
        </div>
        <div className="feature-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          {/* <img
            src="/assets/direct-sales.svg"
            alt="Direct Sales"
            className="w-12 h-12 mb-4"
          /> */}
          <h3 className="text-xl font-semibold mb-2">Direct Sales</h3>
          <p className="text-gray-600 text-center">
            Buy directly from farmers without any middlemen.
          </p>
        </div>
        <div className="feature-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          {/* <img
            src="/assets/quality-animals.svg"
            alt="Quality Animals"
            className="w-12 h-12 mb-4"
          /> */}
          <h3 className="text-xl font-semibold mb-2">Quality Animals</h3>
          <p className="text-gray-600 text-center">
            We ensure only healthy and high-quality animals are listed.
          </p>
        </div>
      </div>

      {/* Featured Animals Section */}
      <div className="top-animals-section  w-full px-6 mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Animals
        </h2>
        <div
          className={`flex overflow-x-auto space-x-4 transition-all duration-40000 ${
            refreshAnimation
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          {featuredAnimals.length > 0 ? (
            featuredAnimals.map((animal) => (
              <div
                key={animal.id}
                className="animal-card w-60 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-1000 ease-in-out"
              >
                <img
                  src={animal.image_url}
                  alt={animal.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{animal.name}</h2>
                <p className="text-gray-700">{animal.description}</p>
                <button
                  onClick={() => navigate(`/animal/${animal.id}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">Loading featured animals...</p>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section w-full px-6 mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          What Our Users Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
          <div
            className="testimonial-card bg-white p-6 rounded-lg shadow-md text-center bg-cover"
            style={{ backgroundImage: `url(${highlightsBanner})` }}
          >
            <p className="text-white mb-4">
              "I love the direct connection to farmers. The animals are healthy
              and prices are fair!"
            </p>
            <h4 className="font-semibold">Denis Korir</h4>
          </div>
          <div
            className="testimonial-card bg-white p-6 rounded-lg shadow-md text-center bg-cover"
            style={{ backgroundImage: `url(${highlightsBanner2})` }}
          >
            <p className="text-white mb-4">
              "FarmMart has made it so easy for me to sell my livestock without
              any hassle."
            </p>
            <h4 className="font-semibold">@mkulimahalisi</h4>
          </div>
        </div>
      </div>
    </div>
  );

export default Home;
