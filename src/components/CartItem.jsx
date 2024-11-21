import React, { useEffect, useState } from "react";

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity); // Local state for quantity
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Log the current props whenever item changes
  useEffect(() => {
    console.log("CartItem Props:", item);
  }, [item]);

  // Handle quantity input change
  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    // If invalid quantity, return early and show an error
    if (isNaN(newQuantity) || newQuantity <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }

    setErrorMessage(""); // Clear error messages if input is valid
    setQuantity(newQuantity); // Update local quantity state
    handleQuantityChange(item.animal_id, newQuantity); // Notify parent component about the change
  };

  // Handle removing the item from the cart
  const handleRemove = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors before attempting to remove

    try {
      await handleRemoveItem(item.animal_id); // Notify parent to remove the item
    } catch (error) {
      console.error("Error removing item:", error);
      setErrorMessage("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="cart-item card bg-white rounded-lg shadow-lg p-4">
      {/* Image with fallback */}
      <img
        src={item.image_url || '/default-image-url.jpg'}
        alt={item.animal_name}
        className="cart-item-image rounded-md mb-4"
      />

      <div className="item-details">
        <h3 className="text-lg font-semibold">{item.animal_name}</h3>
        <p className="text-sm text-gray-500">Price: Ksh. {item.price}</p>

        {/* Display error message if any */}
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

        {/* Quantity input section */}
        <div className="quantity mt-4">
          <label htmlFor={`quantity-${item.animal_id}`} className="text-sm font-medium">
            Quantity: 
          </label>
          <input
            type="number"
            id={`quantity-${item.animal_id}`}
            value={quantity} // Controlled input based on local state
            onChange={handleInputChange}
            min="1" // Quantity cannot be less than 1
            className="mt-2 p-2 border border-gray-300 rounded-md w-16"
            aria-label={`Change quantity for ${item.animal_name}`} // Accessibility improvement
          />
        </div>

        {/* Remove item button with loading state */}
        <button
          onClick={handleRemove}
          disabled={isLoading} // Disable the button when the item is being removed
          aria-label={`Remove ${item.animal_name} from cart`} // Accessibility improvement
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400"
        >
          {isLoading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
