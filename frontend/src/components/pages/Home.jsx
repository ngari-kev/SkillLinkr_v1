import React from "react";
import Header from "../Header";
import HeroSection from "../HeroSection";
import Footer from "./Footer";
import Feature from "../Feature";

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
      </div>
      <Feature />
      {/* <div className="ml-5">
        <CallToAction />
      </div> */}
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Home;
