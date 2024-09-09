import React from "react";
import CallToAction from "./CallToAction";
import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  return (
    <div className="flex-1 flex flex-col justify-center z-10 relative">
      <section className="relative h-screen w-full overflow-x-hidden bg-cover bg-center ">
        <HeroImage />
        <HeroContent />
      </section>
    </div>
  );
};

export default HeroSection;
