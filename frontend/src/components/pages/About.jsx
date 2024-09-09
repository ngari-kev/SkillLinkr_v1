import React from "react";
import CompanyInfo from "../CompanyInfo";
import TeamInfo from "../TeamInfo";
import Header from "../Header";
import Footer from "../pages/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-sky-900 m-10">
            About Us
          </h1>
          <CompanyInfo />
          <TeamInfo />
        </div>
      </div>
       
      <Footer />
    </>
  );
};

export default About;
