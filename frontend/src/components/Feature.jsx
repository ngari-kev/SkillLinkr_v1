import React from "react";
import { featureCards } from "../data/featureCards";

const Feature = () => {
  return (
    <>
      {/* Feature Section */}
      <section id="features" className="py-40 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl text-sky-900 font-bold mb-10">Project Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featureCards.map((feature) => (
              <div key={feature.title} className="bg-white shadow-xl text-sky-900 rounded-lg p-6">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="mb-4 w-full h-auto"
                />
                <h4 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-700 text-sky-900">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
