import React from "react";
import { Link } from "react-router-dom";
 
const LandingPage = () => {
  return (
    <>
    <div className="bg-white min-h-screen flex flex-col">
       {/* Header */}
      <header className="fixed top-0 left-0 right-50 z-50 flex items-center justify-between p-6 bg-white">
        <div className="flex items-center space-x-10">
          <img
            src="src/assets/SkillLinkr_White.svg"
            alt="SkillLinkr logo"
            className="h-13 w-20"
          />
          <nav className="flex space-x-10">
            <Link
              to="/product"
              className="text-sky-900 font-medium hover:text-sky-500"
            >
              Home
            </Link>
            <Link
              to="/features"
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex flex-col lg:flex-row flex-1">
        <div className="flex-1 flex flex-col justify-center px-8 py-24 z-10 relative">
          <p className="text-sky-900 text-md font-medium mb-20">
            Anim aute id magna aliqua ad ad non deserunt sunt.{" "}
            <a href="#" className="text-sky-700">
              Read more
            </a>
          </p>
          <h1 className="text-6xl font-extrabold text-sky-900 mb-10">
            Data to enrich your online business
          </h1>
          <p className="text-sky-900 text-lg mb-20">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="flex space-x-10">
            <Link
              to="signup"
              className="px-10 py-3 text-white bg-sky-900 font-semibold rounded-md hover:bg-sky-500 hover:text-sky-800"
            >
              Get started
            </Link>
            <Link
              to="#"
              className="px-10 py-3 text-sky-900 font-semibold bg-sky-200 rounded-md hover:bg-sky-500 hover:text-sky-100"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="flex-1 h-full">
          <img
            src="https://images.pexels.com/photos/7437499/pexels-photo-7437499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="People working"
            className="w-full h-full object-cover"
          />
        </div>
      </main>
    </div>
    </>
    
  );
};

export default LandingPage;
