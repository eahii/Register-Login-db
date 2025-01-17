import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]); // Add item to cart
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId)); // Remove item from cart
    };

    const clearCart = () => {
        setCartItems([]); // Clear all items from cart
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children} // Provide cart context to children components
        </CartContext.Provider>
    );
}

// Create a custom hook to use the CartContext
export function useCart() {
    return useContext(CartContext); // Access cart context
}