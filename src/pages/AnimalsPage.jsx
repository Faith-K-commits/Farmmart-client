import React, { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import Pagination from "../components/Pagination";
import {
  searchAnimals,
  filterAnimals,
  getCategories,
  getBreeds,
} from "../api/animalsApi";

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

  const [categories, setCategories] = useState([]);
  const [breeds, setBreeds] = useState([]);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="flex p-6">
      {/* Sidebar Filter Section */}
      <div className="w-1/4 pr-6">
        <div className="sticky top-6">
          <h1 className="text-2xl font-bold mb-4">Animals</h1>
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <input
              list="categoryOptions"
              type="text"
              name="category"
              placeholder="Category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border p-2 rounded w-auto"
            />
            <datalist id="categoryOptions">
              {categories.map((category, idx) => (
                <option key={idx} value={category} />
              ))}
            </datalist>
          </div>

          {/* Breed Dropdown */}
          <div className="mb-4">
            <label className="block mb-1">Breed</label>
            <input
              list="breedOptions"
              type="text"
              name="breed"
              placeholder="Breed"
              value={filters.breed}
              onChange={handleFilterChange}
              className="border p-2 rounded w-auto"
            />
            <datalist id="breedOptions">
              {breeds.map((breed, idx) => (
                <option key={idx} value={breed} />
              ))}
            </datalist>
          </div>

          {/* Min Age Field */}
          <div className="mb-4">
            <label className="block mb-1">Min Age</label>
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
              className="border p-2 rounded w-auto"
            />
          </div>

          {/* Max Age Field */}
          <div className="mb-4">
            <label className="block mb-1">Max Age</label>
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
              className="border p-2 rounded w-auto"
            />
          </div>
        </div>
      </div>

      {/* Animals List Section */}
      <div className="w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
    </div>
  );
};

export default AnimalsPage;
