import React from 'react';
import { useCart } from '../context/CartContext'; // Ensure CartContext is correctly set up

function Cart() {
    const { cartItems, removeFromCart } = useCart(); // Access cartItems and removeFromCart from CartContext

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price.toFixed(2)}
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
