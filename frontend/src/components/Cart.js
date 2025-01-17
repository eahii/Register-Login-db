import React from 'react';
import { useCart } from '../context/CartContext'; // Use CartContext to manage cart state

function Cart() {
    const { cartItems, removeFromCart } = useCart(); // Access cart items and remove function

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price.toFixed(2)}
                            <button onClick={() => removeFromCart(item)}>Remove</button> {/* Remove item from cart */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p> // Display message if cart is empty
            )}
        </div>
    );
}

export default Cart;