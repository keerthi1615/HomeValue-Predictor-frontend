import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

function SignupPage() {
  return (
    <div className="auth-page">
      <div>
        {/* PROJECT TITLE */}
        <h1 className="title">🏠 HomeValue Predictor</h1>

        <form className="form-box">
          <h2>Signup</h2>

          <input type="text" placeholder="Name" required /><br />
          <input type="email" placeholder="Email" required /><br />
          <input type="password" placeholder="Password" required /><br />

          <select>
            <option>User</option>
            <option>Admin</option>
          </select><br /><br />

          <button type="submit">Signup</button>

          <p>
            Already have account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;