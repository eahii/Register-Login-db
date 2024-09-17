import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Store() {
    const [items, setItems] = useState([]);
    const { addToCart } = useCart(); // Access addToCart from CartContext

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="store-container">
            <h2>Store</h2>
            <div className="items-list">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="item-card">
                            <h3>{item.name}</h3>
                            <p>${item.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No items available for sale</p>
                )}
            </div>
            <Link to="/add-item">
                <button>Add New Item</button>
            </Link>
        </div>
    );
}

export default Store;
