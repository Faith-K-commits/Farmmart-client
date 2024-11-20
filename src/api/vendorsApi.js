const BASE_URL = "http://127.0.0.1:5000";

export const createAnimal = async (formData) => {
  const response = await fetch(`${BASE_URL}/vendor/animals`, {
    method: "POST",
    body: formData, // FormData includes both file and other fields
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create animal");
  }
  return await response.json();
};

// Fetch the animals for the logged-in vendor
export const fetchVendorAnimals = async () => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  if (!token) throw new Error("Authorization token is missing");

  const response = await fetch(`${BASE_URL}/vendor/animals/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token for authentication
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vendor animals");
  }

  return await response.json(); // Return the animals as a JSON array
};

// Update an animal
export const updateAnimal = async (animalId, formData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authorization token is missing");

  const response = await fetch(`${BASE_URL}/vendor/animals/${animalId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`, // Authentication token
    },
    body: formData, // `formData` handles both text and file fields
  });

  if (!response.ok) {
    throw new Error("Failed to update animal");
  }

  return await response.json();
};

// Delete an animal
export const deleteAnimal = async (animalId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authorization token is missing");

  const response = await fetch(`${BASE_URL}/vendor/animals/${animalId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Include token for authentication
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete animal");
  }

  return await response.json(); // Return the response for confirmation
};
