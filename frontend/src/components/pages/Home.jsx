import React from "react";
import Header from "../Header";
import HeroSection from "../HeroSection";
import CallToAction from "../CallToAction";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="">
        <div className="bg-white min-h-screen flex flex-col">
          <Header />
          <main className="relative flex flex-col lg:flex-row flex-1">
            <HeroSection />
          </main>
         </div>
        <div className="ml-5">
          <CallToAction />
        </div>
      </div>
      <div className="mt-10">
      <Footer/>
      </div>
    </>
  );
};

export default Home;
