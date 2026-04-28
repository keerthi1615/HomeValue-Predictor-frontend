import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMapMarkerAlt, FaRupeeSign, FaHome } from "react-icons/fa";
import "../styles/App.css";

// ✅ Production backend URL
const API_URL = "https://homevalue-predictor-backend-production.up.railway.app";

function AdminPage({ setIsLoggedIn }) {
  const [properties, setProperties] = useState([]);

  const [form, setForm] = useState({
    location: "",
    budget: "",
    size: "",
    type: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  // 🔐 Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  // 📡 Fetch properties
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios
      .get(`${API_URL}/properties`)
      .then((res) => {
        console.log("Fetched:", res.data);
        setProperties(res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add property
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/properties`, form)
      .then((res) => {
        console.log("Added:", res.data);
        fetchProperties(); // refresh list
        setForm({
          location: "",
          budget: "",
          size: "",
          type: "",
          imageUrl: "",
        });
      })
      .catch((err) => {
        console.error("Add error:", err);
      });
  };

  // ❌ Delete property (FIXED + DEBUG)
  const handleDelete = (id) => {
    console.log("Trying to delete ID:", id);

    axios
      .delete(`${API_URL}/properties/${id}`)
      .then((res) => {
        console.log("Deleted successfully:", res);
        fetchProperties(); // refresh UI after delete
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>👨‍💼 Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Form */}
      <h2>Add Property</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="budget"
          placeholder="Budget"
          value={form.budget}
          onChange={handleChange}
          required
        />
        <input
          name="size"
          placeholder="Size"
          value={form.size}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Add Property</button>
      </form>

      {/* Cards */}
      <div className="card-container">
        {properties.length === 0 ? (
          <p>No properties available</p>
        ) : (
          properties.map((p) => (
            <div className="card" key={p.id}>
              <img
                src={
                  p.imageUrl ||
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                }
                alt="property"
              />

              <div className="card-body">
                <h3>
                  <FaMapMarkerAlt /> {p.location}
                </h3>
                <p>
                  <FaRupeeSign /> {p.budget}
                </p>
                <p>📐 {p.size}</p>
                <p>
                  <FaHome /> {p.type}
                </p>

                <button onClick={() => handleDelete(p.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPage;
