// src/components/MainContent.jsx
import React from "react";
import CallToAction from "./CallToAction";

const MainContent = () => (
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
      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
      cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
    </p>
    <CallToAction />
  </div>
);

export default MainContent;
