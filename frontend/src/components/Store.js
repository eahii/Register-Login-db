// frontend/src/components/Store.js
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

    // Function to handle item deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            setItems(items.filter(item => item.id !== id)); // Update local state to remove item
            alert('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item');
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
                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button> {/* Add delete button */}
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
