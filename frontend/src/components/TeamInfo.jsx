import React from "react";
import {teamMembers} from "../data/teamMembers"
import { FaGithub, FaTwitter, FaLinkedin, } from "react-icons/fa";
 

const TeamInfo = () => {
  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center mt-8"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-md h-full rounded-full object-cover mb-10"
              />
              <h3 className="text-xl font-semibold text-sky-900">
                {member.name}
              </h3>
              <p className="text-md text-sky-700">{member.role}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600">
                  <FaGithub className="w-6 h-6" />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-900">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* <div>
        <h3>Project Repo <span><a href="#" className="text-gray-900 hover:text-gray-600">
                  <FaGithub className="w-6 h-6" />
                </a></span></h3>
        </div> */}
      </section>
    </>
  );
};

export default TeamInfo;
