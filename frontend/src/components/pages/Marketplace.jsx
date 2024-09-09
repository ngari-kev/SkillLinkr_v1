import React from "react";
import { peopleData } from "../../data/marketplacecards";
import Header from "../Header";
import Footer from "./Footer";


const Marketplace = () => {
  return (
    <>
    <Header/>
       <section id="marketplace" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl text-sky-900 font-bold m-14">Marketplace</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {peopleData.map((person) => (
              <div key={person.id} className="bg-white shadow-xl rounded-lg p-6">
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="mb-4 w-full h-48 object-cover rounded-lg"
                />
                <h4 className="text-xl font-semibold mb-2">{person.name}</h4>
                <p className="text-gray-700 mb-2">{person.occupation}</p>
                <p className="text-gray-700">
                  <strong>Skills:</strong> {person.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Marketplace;
