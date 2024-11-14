import React, { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import Pagination from "../components/Pagination";
import { searchAnimals, filterAnimals } from "../api/animalsApi";

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    breed: "",
    ageMin: null,
    ageMax: null,
  });

  // Fetch animals based on the filters
  useEffect(() => {
    const loadAnimals = async () => {
      try {
        let response;

        // Use search endpoint if category or breed is provided
        if (filters.category || filters.breed) {
          response = await searchAnimals(currentPage, 10, {
            category: filters.category,
            breed: filters.breed,
          });

          // Otherwise, use the filter endpoint for age and breed filtering
        } else {
          response = await filterAnimals(currentPage, 10, {
            breed: filters.breed,
            ageMin: filters.ageMin,
            ageMax: filters.ageMax,
          });
        }

        setAnimals(response.animals);
        setTotalPages(response.pagination.total_pages);
      } catch (error) {
        console.error("Failed to load animals:", error);
      }
    };
    loadAnimals();
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Animals</h1>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        {/* Category Input Field */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={filters.breed}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="ageMin"
          placeholder="Min Age"
          value={filters.ageMin || ""}
          onChange={(e) =>
            handleFilterChange({
              target: { name: "ageMin", value: parseInt(e.target.value) || "" },
            })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="ageMax"
          placeholder="Max Age"
          value={filters.ageMax || ""}
          onChange={(e) =>
            handleFilterChange({
              target: { name: "ageMax", value: parseInt(e.target.value) || "" },
            })
          }
          className="border p-2 rounded"
        />
      </div>

      {/* Animals List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AnimalsPage;
