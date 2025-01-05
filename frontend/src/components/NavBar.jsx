import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="flex space-x-24">
        <Link
          to="/"
          className="text-sky-900 font-bold hover:text-sky-500 ml-10"
        >
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
        {/* <Link
          to="/company"
          className="text-sky-900 font-bold hover:text-sky-500"
        >
          Company
        </Link> */}
        <Link to="/login" className="text-sky-900 font-bold hover:text-sky-500">
          Log in
        </Link>
        <Link
          to="/profile"
          className="text-sky-900 font-bold hover:text-sky-500"
        >
          Profile
        </Link>
        <Link
          to="/signup"
          className="ml-4 px-10 py-3 text-white bg-sky-500 font-bold rounded-md hover:bg-sky-700 hover:text-white"
        >
          Get started
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
