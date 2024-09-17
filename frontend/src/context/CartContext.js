import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Create a custom hook to use the CartContext
export function useCart() {
    return useContext(CartContext);
}
