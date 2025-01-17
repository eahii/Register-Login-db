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
                setItems(response.data); // Set items from the response
            } catch (error) {
                console.error('Error fetching items:', error); // Log any errors
            }
        };

        fetchItems(); // Fetch items on component mount
    }, []);

    // Function to handle item deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            setItems(items.filter(item => item.id !== id)); // Update local state to remove item
            alert('Item deleted successfully'); // Notify user of successful deletion
        } catch (error) {
            console.error('Error deleting item:', error); // Log any errors
            alert('Failed to delete item'); // Notify user of failure
        }
    };

    return (
        <div className="store-container">
            <h2>Store</h2>
            <div className="items-list">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="item-card">
                            <h3>{item.name}</h3>
                            <p>${item.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(item)}>Add to Cart</button> {/* Add item to cart */}
                            <button onClick={() => handleDelete(item.id)}>Delete</button> {/* Delete item */}
                        </div>
                    ))
                ) : (
                    <p>No items available for sale</p> // Display message if no items
                )}
            </div>
            <Link to="/add-item">
                <button>Add New Item</button> {/* Navigate to add item page */}
            </Link>
        </div>
    );
}

export default Store;