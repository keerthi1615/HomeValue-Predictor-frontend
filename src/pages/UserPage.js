import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRupeeSign, FaHome } from "react-icons/fa";
import "../styles/App.css";

// ✅ Backend URL
const API_URL = "https://homevalue-predictor-backend-production.up.railway.app";

function UserPage({ setIsLoggedIn }) {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // 🔐 Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  // 📡 Fetch properties
  useEffect(() => {
    axios
      .get(`${API_URL}/properties`) // ✅ FIXED
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🏠 User Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Property Cards */}
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserPage;
