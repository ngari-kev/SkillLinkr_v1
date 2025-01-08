import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api";

const NavBar = () => {
  const isLoggedIn = !!localStorage.getItem("access");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout API function
      localStorage.removeItem("access"); // Clear tokens from local storage
      localStorage.removeItem("refresh");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex space-x-24">
      <Link to="/" className="text-sky-900 font-bold hover:text-sky-500 ml-10">
        Home
      </Link>
      <Link to="/about" className="text-sky-900 font-bold hover:text-sky-500">
        About
      </Link>
      <Link
        to="/marketplace"
        className="text-sky-900 font-bold hover:text-sky-500"
      >
        Marketplace
      </Link>

      {!isLoggedIn && (
        <Link to="/login" className="text-sky-900 font-bold hover:text-sky-500">
          Log in
        </Link>
      )}
      {isLoggedIn && (
        <Link
          to="/profile"
          className="text-sky-900 font-bold hover:text-sky-500"
        >
          Profile
        </Link>
      )}
      <div className="ml-auto">
        {!isLoggedIn && (
          <Link
            to="/signup"
            className="px-10 py-3 text-white bg-sky-500 font-bold rounded-md hover:bg-sky-700 hover:text-white"
          >
            Get started
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-10 py-3 text-white bg-sky-500 font-bold rounded-md hover:bg-sky-700 hover:text-white"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
