const API_BASE_URL = "http://127.0.0.1:5000";  // Replace with your actual API base URL

// Get Cart Items with pagination
export const getCartItems = async (userId, page = 1, perPage = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/items?page=${page}&per_page=${perPage}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    const data = await response.json();
    return data; // Returns the paginated response { cart_items, total_items, total_pages }
  } catch (error) {
    throw new Error('Error fetching cart items: ' + error.message);
  }
};


export const addItemToCart = async (cartId, animalId, quantity) => {
  // Extract userId from the cartId (assuming the cartId format is 'cart-<userId>')
  const userId = cartId.split('-')[1]; // This assumes the format is 'cart-<userId>'

  if (!userId) {
    throw new Error('Invalid cartId. Could not extract userId.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animal_id: animalId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    const data = await response.json();
    return data.cart_item; // Assuming the response returns the updated cart item
  } catch (error) {
    throw new Error('Error adding item to cart: ' + error.message);
  }
};

// Remove Item from Cart
export const removeCartItem = async (userId, animalId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/items/${animalId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    const data = await response.json();
    return data; // Response with success or updated cart data
  } catch (error) {
    throw new Error('Error removing item from cart: ' + error.message);
  }
};

// Checkout Cart
export const checkoutCart = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/checkout`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error('Failed to checkout');
    }
    const data = await response.json();
    return data.order; // Assuming the order details are returned
  } catch (error) {
    throw new Error('Error during checkout: ' + error.message);
  }
};
