import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

function AddItem() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/items/add', { name, price });
            alert('Item added successfully!');
            setName('');
            setPrice('');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item.');
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit">Add Item</button>
            </form>
            <Link to="/">
                <button>Back to Store</button>
            </Link>
        </div>
    );
}

export default AddItem;
