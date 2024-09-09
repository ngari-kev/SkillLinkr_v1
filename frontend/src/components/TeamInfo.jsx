import React from "react";
import {teamMembers} from "../data/teamMembers"
import { FaGithub } from "react-icons/fa";

const TeamInfo = () => {
  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-8"
              />
              <h3 className="text-xl font-semibold text-sky-900">
                {member.name}
              </h3>
              <p className="text-md text-sky-700">{member.role}</p>
              <a href="#" className="text-gray-900">
            <FaGithub className="w-6 h-6" />
          </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TeamInfo;
