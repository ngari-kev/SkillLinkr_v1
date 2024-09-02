import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <>
      <nav className="flex space-x-10">
        <Link
          to="/"
          className="text-sky-900 font-medium hover:text-sky-500"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-sky-900 font-medium hover:text-sky-500"
        >
          About
        </Link>
        <Link
          to="/marketplace"
          className="text-sky-900 font-medium hover:text-sky-500"
        >
          Marketplace
        </Link>
        <Link
          to="/company"
          className="text-sky-900 font-medium hover:text-sky-500"
        >
          Company
        </Link>
        <Link
          to="/login"
          className="text-sky-900 font-medium hover:text-sky-500"
        >
          Log in
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
