
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          isLoggedIn
            ? role === "admin"
              ? <Navigate to="/admin" />
              : <Navigate to="/user" />
            : <LoginPage setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        } />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/user" element={
          isLoggedIn ? <UserPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />
        } />

        <Route path="/admin" element={
          isLoggedIn ? <AdminPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;