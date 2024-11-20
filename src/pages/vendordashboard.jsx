import React, { useState, useEffect } from "react";
import {
  createAnimal,
  fetchVendorAnimals,
  updateAnimal,
  deleteAnimal,
} from "../api/vendorsApi";
import { toast } from "react-toastify";

const VendorDashboard = () => {
  const [activeSection, setActiveSection] = useState("create");
  const [animals, setAnimals] = useState([]); // State to hold fetched animals
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    available_quantity: "",
    description: "",
    category: "",
    breed: "",
    age: "",
    image: null, // For the image file
  });

  // Update text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update image field
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Debug log
      setFormData({ ...formData, image: file });
    } else {
      console.log("No file selected.");
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append all non-file fields
    for (const key in formData) {
      if (key !== "image") {
        form.append(key, formData[key]);
      }
    }

    // Append the file (image)
    if (formData.image) {
      form.append("file", formData.image); // Add file under "file" key
    } else {
      alert("Please select an image file."); // Debug alert if the file is missing
      return;
    }

    try {
      await createAnimal(form);
      toast.success("Animal created successfully!");
      setFormData({
        name: "",
        price: "",
        available_quantity: "",
        description: "",
        category: "",
        breed: "",
        age: "",
        image: null,
      });
    } catch (error) {
      toast.error("Failed to create animal.");
    }
  };

  // Fetch animals when the "view" section is activated
  useEffect(() => {
    if (activeSection === "view") {
      const fetchAnimals = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchVendorAnimals();
          setAnimals(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimals();
    }
  }, [activeSection]);

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, file: e.target.files[0] });
  // };

  // Handle animal update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append all fields in formData
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        if (key === "image") {
          form.append("file", formData[key]); // Append the file with the correct key
        } else {
          form.append(key, formData[key]);
        }
      }
    });

    try {
      const updatedAnimal = await updateAnimal(editingAnimal.id, form);

      // Update the list with the updated animal
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) =>
          animal.id === updatedAnimal.id ? updatedAnimal : animal
        )
      );

      toast.success("Animal updated successfully!");
      setEditingAnimal(null);
      setFormData({
        name: "",
        price: "",
        available_quantity: "",
        description: "",
        category: "",
        breed: "",
        age: "",
        image: null,
      });
    } catch (error) {
      toast.error("Failed to update animal.");
    }
  };

  return (
    <div className="vendor-dashboard flex">
      {/* Navigation */}
      <aside className="navigation w-1/4 p-4 bg-gray-100">
        <ul className="space-y-4">
          <li
            onClick={() => setActiveSection("create")}
            className={`cursor-pointer ${
              activeSection === "create" ? "font-bold" : ""
            }`}
          >
            Create Animals
          </li>
          <li
            onClick={() => setActiveSection("view")}
            className={`cursor-pointer ${
              activeSection === "view" ? "font-bold" : ""
            }`}
          >
            View Animals
          </li>
          <li
            onClick={() => setActiveSection("orders")}
            className={`cursor-pointer ${
              activeSection === "orders" ? "font-bold" : ""
            }`}
          >
            Orders
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content w-3/4 p-6">
        {activeSection === "create" && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="available_quantity"
              placeholder="Quantity"
              value={formData.available_quantity}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
            ></textarea>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={formData.breed}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Animal
            </button>
          </form>
        )}

        {activeSection === "view" && (
          <div>
            <h1 className="text-xl font-bold mb-4">Your Animals</h1>
            {loading && <p>Loading animals...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && animals.length === 0 && (
              <p>No animals listed yet. Create some to view them here!</p>
            )}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animals.map((animal) => (
                <li key={animal.id} className="border p-4 rounded shadow">
                  {editingAnimal && editingAnimal.id === animal.id ? (
                    <form onSubmit={handleUpdate} className="grid gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={animal.name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        defaultValue={animal.price}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                      <input
                        type="number"
                        name="available_quantity"
                        placeholder="Available Quantity"
                        defaultValue={animal.available_quantity}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        defaultValue={animal.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      ></textarea>
                      <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        defaultValue={animal.category}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        defaultValue={animal.breed}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        defaultValue={animal.age}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                      <input
                        type="file"
                        name="file"
                        onChange={handleImageChange}
                        className="border p-2 rounded"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAnimal(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h2 className="font-bold">{animal.name}</h2>
                      <p>Price: {animal.price}</p>
                      <img
                        src={animal.image_url}
                        alt={animal.name}
                        className="w-32 h-32 object-cover mt-2"
                      />
                      <button
                        onClick={() => {
                          setEditingAnimal(animal);
                          setFormData({
                            name: animal.name || "",
                            price: animal.price || "",
                            available_quantity: animal.available_quantity || "",
                            description: animal.description || "",
                            category: animal.category || "",
                            breed: animal.breed || "",
                            age: animal.age || "",
                            image: null, // Reset image field for new selection
                          });
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeSection === "orders" && <div>Orders Section</div>}
      </main>
    </div>
  );
};

export default VendorDashboard;
