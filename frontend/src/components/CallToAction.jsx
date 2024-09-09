import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <>
      <div className="flex mx-auto bg-gray-50 mb-20 space-x-20">
        <Link
          to="signup"
          className="px-10 py-3 text-white bg-sky-900 font-semibold rounded-md hover:bg-sky-500 hover:text-sky-800"
        >
          Get started
        </Link>
        <Link
          to="#"
          className="px-10 py-3 text-sky-900 font-semibold bg-sky-200 rounded-md hover:bg-sky-500 hover:text-sky-100"
        >
          Learn more
        </Link>
      </div>
    </>
  );
};

export default CallToAction;
