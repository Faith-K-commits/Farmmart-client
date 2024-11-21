import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to provide the context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // state for cart items
  const [totalPrice, setTotalPrice] = useState(0); // state for total price

  // This effect can fetch the cart data from an API (optional)
  useEffect(() => {
    // Here you could fetch cart data from localStorage or an API
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    updateTotalPrice(storedCart);
  }, []);

  // Update the total price based on cart items
  const updateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem('cart', JSON.stringify(updatedItems)); // Save to localStorage
      updateTotalPrice(updatedItems); // Update the total price
      return updatedItems;
    });
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (animalId) => {
    const updatedItems = cartItems.filter(item => item.animal_id !== animalId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Save to localStorage
    updateTotalPrice(updatedItems);
  };

  // Function to update item quantity
  const updateItemQuantity = (animalId, quantity) => {
    const updatedItems = cartItems.map(item =>
      item.animal_id === animalId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Save to localStorage
    updateTotalPrice(updatedItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, addItemToCart, removeItemFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
