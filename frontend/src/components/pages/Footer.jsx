import React from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sky-950 py-10">
      <div className="container mx-auto text-center">
        {/* Top navigation links */}
        <div className="flex justify-center space-x-20 mb-10">
          <Link to="/" className="text-white hover:text-sky-200">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-sky-200">
            About
          </Link>
          <Link to="/marketplace" className="text-white hover:text-sky-200">
            Marketplace
          </Link>
          <Link to="#" className="text-white hover:text-sky-200">
            Blog
          </Link>
          <Link to="/login" className="text-white hover:text-sky-200">
            Login
          </Link>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-600 hover:text-blue-900 hover:bg-white hover:rounded-lg">
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-rose-900 hover:bg-white hover:rounded-lg">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-white">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-red-900 hover:bg-white hover:rounded-md">
            <FaYoutube className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white font-bold text-sm">
          © 2024 SkillLinkr, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
