import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api";

const NavBar = () => {
  const isLoggedIn = !!localStorage.getItem("access");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <div className="flex space-x-8">
        <Link to="/" className="text-sky-900 font-bold hover:text-sky-500">
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
          <Link
            to="/login"
            className="text-sky-900 font-bold hover:text-sky-500"
          >
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
      </div>

      {/* Right side buttons */}
      <div>
        {!isLoggedIn ? (
          <Link
            to="/signup"
            className="px-10 py-3 text-white bg-sky-500 font-bold rounded-md hover:bg-sky-700 hover:text-white"
          >
            Get started
          </Link>
        ) : (
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
