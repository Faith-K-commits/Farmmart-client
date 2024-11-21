// src/pages/AnimalsPage.jsx
import React, { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import Pagination from "../components/Pagination";
import {
  searchAnimals,
  filterAnimals,
  getCategories,
  getBreeds,
} from "../api/animalsApi";

function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    breed: "",
    ageMin: null,
    ageMax: null,
  });

  const [categories, setCategories] = useState([]);
  const [breeds, setBreeds] = useState([]);

  // Fetch dropdown data for categories and breeds
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [fetchedCategories, fetchedBreeds] = await Promise.all([
          getCategories(),
          getBreeds(),
        ]);
        setCategories(fetchedCategories);
        setBreeds(fetchedBreeds);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };
    fetchDropdownData();
  }, []);

  // Load animals based on filters
  useEffect(() => {
    const loadAnimals = async () => {
      let response;
      if (filters.category || filters.breed) {
        response = await searchAnimals(currentPage, 9, {
          category: filters.category,
          breed: filters.breed,
        });
      } else {
        response = await filterAnimals(currentPage, 9, {
          breed: filters.breed,
          ageMin: filters.ageMin,
          ageMax: filters.ageMax,
        });
      }
      setAnimals(response.animals);
      setTotalPages(response.pagination.total_pages);
    };
    loadAnimals();
  }, [currentPage, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-slate-500">
      {/* Sidebar Section */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-6">
          <h1 className="text-2xl text-orange-400 font-bold mb-4">Animals</h1>
          <h2 className="text-xl font-bold mb-4">Search</h2>

          {/* Category Search Input */}
          <div className="mb-4">
            <input
              list="categoryOptions"
              type="text"
              name="category"
              placeholder="Search category..."
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-lg"
            />
            <datalist id="categoryOptions">
              {categories.map((category, idx) => (
                <option key={idx} value={category} />
              ))}
            </datalist>
          </div>

          {/* Breed Search Input */}
          <div className="mb-4">
            <input
              list="breedOptions"
              type="text"
              name="breed"
              placeholder="Search breed..."
              value={filters.breed}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-lg"
            />
            <datalist id="breedOptions">
              {breeds.map((breed, idx) => (
                <option key={idx} value={breed} />
              ))}
            </datalist>
          </div>

          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">All</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Breed Dropdown */}
          <div className="mb-4">
            <label className="block mb-1">Breed</label>
            <select
              name="breed"
              value={filters.breed}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">All</option>
              {breeds.map((breed, idx) => (
                <option key={idx} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          {/* Min Age Input */}
          <div className="mb-4">
            <label className="block mb-1">Minimum Age</label>
            <input
              type="number"
              name="ageMin"
              placeholder="Min Age"
              value={filters.ageMin || ""}
              onChange={(e) =>
                handleFilterChange({
                  target: {
                    name: "ageMin",
                    value: parseInt(e.target.value) || "",
                  },
                })
              }
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Max Age Input */}
          <div className="mb-4">
            <label className="block mb-1">Maximum Age</label>
            <input
              type="number"
              name="ageMax"
              placeholder="Max Age"
              value={filters.ageMax || ""}
              onChange={(e) =>
                handleFilterChange({
                  target: {
                    name: "ageMax",
                    value: parseInt(e.target.value) || "",
                  },
                })
              }
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Animals List Section */}
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default AnimalsPage;
