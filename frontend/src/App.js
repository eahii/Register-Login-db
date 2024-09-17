// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Store from './components/Store';
import AddItem from './components/AddItem';
import Cart from './components/Cart'; // Import Cart component
import { CartProvider } from './context/CartContext';
import './App.css'; // Ensure CSS is imported

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/store">Store</Link></li>
              <li><Link to="/add-item">Add Item</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cart">Cart</Link></li> {/* Link to Cart */}
            </ul>
          </nav>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/store" element={<Store />} />
              <Route path="/cart" element={<Cart />} /> {/* New route for cart */}
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
