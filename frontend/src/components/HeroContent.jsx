import React from "react";
import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <>
      <div className="relative z-20 flex flex-col justify-center items-center text-center h-full">
        <h2 className="text-6xl font-bold text-sky-500 mb-8">
          Welcome to SkillLinkr
        </h2>
        <p className="text-xl text-white font-bold mt-10 py-10 max-w-xl">
          A website that brings together professionals seeking to exchange
          skills or find expertise in specific areas.
        </p>
        <br />
        <Link
          to="/marketplace"
          className="px-10 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-800 transition mt-10"
        >
          View Project
        </Link>
      </div>
    </>
  );
};

export default HeroContent;
