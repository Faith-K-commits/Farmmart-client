import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { removeCartItem, addItemToCart, checkoutCart } from "../api/cartApi"; // Assuming these functions are already defined
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch cart items on initial load or when cartId or currentPage changes
  useEffect(() => {
    const storedCartId = sessionStorage.getItem("cartId");
    if (!cartId && storedCartId) {
      navigate(`/cart/${storedCartId}`);
      return;
    }
    if (cartId) {
      fetchCartItems(cartId, currentPage);
    } else {
      setErrorMessage("Cart ID is missing or invalid.");
      setLoading(false);
    }
  }, [cartId, navigate, currentPage]);

  // Fetch cart items from the API (paginated)
  const fetchCartItems = async (cartId, page = 1) => {
    setLoading(true);
    setErrorMessage("");  // Clear any previous error
    try {
      const userId = cartId.split('-')[1];  // Extract numeric user ID
      const response = await fetch(
        `http://127.0.0.1:5000/cart/${userId}/items?page=${page}&per_page=10&t=${new Date().getTime()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching cart items: " + response.statusText);
      }

      const data = await response.json();
      console.log("Fetched Cart Data:", data);

      if (data.status === "success" && data.cart_items) {
        setCartItems(data.cart_items); // Update cart items
        setTotalPrice(calculateTotalPrice(data.cart_items)); // Update total price
        setTotalItems(data.total_items); // Set total items
        setTotalPages(data.total_pages); // Set total pages for pagination
      } else {
        throw new Error("Cart data is malformed");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setErrorMessage("Error fetching cart items: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate the total price of the cart
  const calculateTotalPrice = (items) => {
    return items.reduce((sum, item) => sum + item.animal_price * item.quantity, 0);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = async (animalId) => {
    setErrorMessage(""); // Clear previous error
    try {
      await removeCartItem(cartId, animalId);
      const updatedItems = cartItems.filter((item) => item.animal_id !== animalId);
      setCartItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems)); // Recalculate total price
    } catch (error) {
      setErrorMessage(error.message); // Display error message if removal fails
    }
  };

  // Handle updating item quantity
  const handleQuantityChange = async (animalId, newQuantity) => {
    setErrorMessage(""); // Clear previous error
    try {
      const updatedItem = await addItemToCart(cartId, animalId, newQuantity);
      const updatedItems = cartItems.map((item) =>
        item.animal_id === animalId ? { ...item, quantity: updatedItem.quantity } : item
      );
      setCartItems(updatedItems); // Update local state with updated item
      setTotalPrice(calculateTotalPrice(updatedItems)); // Update the total price
    } catch (error) {
      setErrorMessage(error.message); // Display error message if updating quantity fails
    }
  };

  // Handle the checkout process
  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(""); // Clear previous error
    try {
      const order = await checkoutCart(cartId);
      setCartItems([]); // Clear the cart on successful checkout
      setTotalPrice(0); // Reset total price
      navigate(`/order-confirmation/${order.id}`); // Redirect to order confirmation page
    } catch (error) {
      setErrorMessage(error.message); // Display error message if checkout fails
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update the current page
      fetchCartItems(cartId, newPage); // Fetch cart items for the new page
    }
  };

  // Handle "Start Shopping" button click (generates a new cart ID)
  const handleStartShopping = () => {
    const newCartId = `cart-${Math.floor(Math.random() * 1000000)}`; // Generate new cart ID
    sessionStorage.setItem("cartId", newCartId); // Store new cart ID in sessionStorage
    navigate(`/animals?cartId=${newCartId}`); // Redirect to animals page
  };

  return (
    <div className="cart-page p-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h1>

      {loading && <p className="text-center text-gray-500">Loading your cart...</p>}
      {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

      {/* If the cart is empty */}
      {cartItems.length === 0 && !loading && (
        <div className="cart-card shadow-lg p-6 bg-white rounded-lg text-center text-gray-500">
          <p>Your cart is empty!</p>
          <p>Browse our categories and discover our best deals!</p>
          <button
            onClick={handleStartShopping}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* Display cart items */}
      <div className="cart-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cartItems.length > 0 && !loading &&
          cartItems.map((item) => (
            <div key={item.animal_id} className="cart-item bg-white shadow-md rounded-lg p-4">
              <CartItem
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination mt-6 text-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Display total price and checkout button */}
      {cartItems.length > 0 && !loading && (
        <div className="checkout mt-6 p-6 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">Total: Ksh. {totalPrice}</h3>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
