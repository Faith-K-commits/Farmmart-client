const BASE_URL = "http://127.0.0.1:5000"; // Adjust this as needed for your backend

// Fetch animals using the /animals/search endpoint for category and breed search
export const searchAnimals = async (
  page = 1,
  perPage = 10,
  searchParams = {}
) => {
  const { category, breed } = searchParams;
  const params = new URLSearchParams({
    page,
    per_page: perPage,
    ...(category && { category }),
    ...(breed && { breed }),
  });

  const response = await fetch(`${BASE_URL}/animals/search?${params}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

// Fetch animals using the /animals/filter endpoint for filtering by breed and age
export const filterAnimals = async (
  page = 1,
  perPage = 10,
  filterParams = {}
) => {
  const { breed, ageMin, ageMax } = filterParams;
  const params = new URLSearchParams({
    page,
    per_page: perPage,
    ...(breed && { breed }),
    ...(ageMin && { age_min: ageMin }),
    ...(ageMax && { age_max: ageMax }),
  });

  const response = await fetch(`${BASE_URL}/animals/filter?${params}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

// Fetch animal details by ID
export const getAnimalDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

// Add animal to cart
export const addToCart = async (animalId, quantity) => {
  const response = await fetch(`${BASE_URL}/cart/1/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ animal_id: animalId, quantity }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

// Fetch categories
export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
};

// Fetch breeds
export const getBreeds = async () => {
  const response = await fetch(`${BASE_URL}/breeds`);
  if (!response.ok) throw new Error("Failed to fetch breeds");
  return await response.json();
};

// Fetch similar animals by vendor ID
export const getSimilarAnimals = async (vendorId) => {
  const response = await fetch(
    `${BASE_URL}/animals/similar?vendor_id=${vendorId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch similar animals");
  }
  return await response.json();
};

// Remove one quantity of animal from cart
export const removeFromCart = async (animalId) => {
  const response = await fetch(`${BASE_URL}/cart/1/items/${animalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: -1 }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error parsing response as JSON:", error);
    throw new Error("Failed to remove from cart");
  }
};
