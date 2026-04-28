import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/App.css";

function LoginPage({ setIsLoggedIn, setRole }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoggedIn(true);
    setRole(user.role);

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="auth-page">
      <div>
        {/* PROJECT TITLE */}
        <h1 className="title">🏠 HomeValue Predictor</h1>

        {/* FORM */}
        <form className="form-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          /><br />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          /><br />

          <select name="role" value={user.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select><br /><br />

          <button type="submit">Login</button>

          <p>
            No account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;