import React from "react";
import {teamMembers} from "../data/teamMembers"

const TeamInfo = () => {
  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-sky-900 mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-sky-900">
                {member.name}
              </h3>
              <p className="text-md text-sky-700">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TeamInfo;
