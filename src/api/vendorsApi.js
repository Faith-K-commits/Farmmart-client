const BASE_URL = "https://farmmart-tvco.onrender.com";

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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authorization token is missing");

  const response = await fetch(`${BASE_URL}/vendor/animals/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vendor animals");
  }

  const data = await response.json(); // Parse JSON
  return data.animals; // Access the animals array directly
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
  if (!animalId) throw new Error("Animal ID is required for deletion");

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authorization token is missing");

  const response = await fetch(
    `${BASE_URL}/vendor/animals/delete/${animalId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(
      `Failed to delete animal: ${errorDetails.error || response.statusText}`
    );
  }

  return await response.json(); // Return response for confirmation
};
