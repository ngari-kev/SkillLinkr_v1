import React from "react";
import { featureCards } from "../data/featureCards";

const Feature = () => {
  return (
    <>
       <section id="features" className="py-40 bg-gray-50">
        <div className="container mx-auto">
           
          <div className="space-y-12">
            {featureCards.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Feature Image */}
                <div className="md:w-1/2 w-full">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="rounded-full w-full object-cover"
                  />
                </div>

                {/* Feature Content */}
                <div className="md:w-1/2 w-full">
                  <h4 className="text-2xl text-sky-900 font-semibold mt-10 mb-8">{feature.title}</h4>
                  <p className="text-sky-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
