import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">User</Link>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

export default Navbar;