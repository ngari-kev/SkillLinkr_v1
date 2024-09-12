import React from "react";
import { peopleData } from "../../data/marketplacecards";
import Header from "../Header";
import Footer from "./Footer";


const Marketplace = () => {
  return (
    <>
    <Header/>
       <section id="marketplace" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl text-sky-900 font-bold m-14">Marketplace</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
            {peopleData.map((person) => (
              <div key={person.id} className="bg-sky-600 shadow-xl rounded-lg p-6">
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="mb-4 w-full h-md object-cover rounded-lg"
                />
                <h4 className="text-xl font-bold mb-2">{person.name}</h4>
                <p className="text-white font-semibold mb-2">{person.occupation}</p>
                <p className="text-white">
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
