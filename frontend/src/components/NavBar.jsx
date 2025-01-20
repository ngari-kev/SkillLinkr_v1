import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa";

const NavBar = () => {
  const isLoggedIn = !!localStorage.getItem("access");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh");

      if (!accessToken && !refreshToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://skilllinkr.ngarikev.tech/api/auth/logout",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Refresh-Token": refreshToken,
          },
        },
      );

      if (response.status === 401) {
        const refreshResponse = await fetch(
          "https://skilllinkr.ngarikev.tech/api/auth/refresh",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem("access", refreshData.access_token);

          await handleLogout();
          return;
        }
      }

      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <nav className="flex justify-evenly w-full px-3 py-2">
      <div className="flex items-center w-full">
        {/* Logo would go here */}
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-sky-900 font-bold hover:text-sky-500">
            Home
          </Link>
          <Link
            to="/about"
            className="text-sky-900 font-bold hover:text-sky-500"
          >
            About
          </Link>
          <Link
            to="/marketplace"
            className="text-sky-900 font-bold hover:text-sky-500"
          >
            Marketplace
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/profile"
                className="text-sky-900 font-bold hover:text-sky-500"
              >
                Profile
              </Link>
              <Link
                to="/chat"
                className="text-sky-900 font-bold hover:text-sky-500"
              >
                <FaComment className="w-6 h-6" />
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="ml-0 flex justify-evenly space-x-12 pr-8 min-w-[500px]">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="x-10 py-3 text-sky-900 font-bold hover:text-sky-500 ml-auto"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-10 py-3 text-white bg-sky-500 font-bold rounded-md hover:bg-sky-700 hover:text-white"
            >
              Get started
            </Link>
          </>
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
