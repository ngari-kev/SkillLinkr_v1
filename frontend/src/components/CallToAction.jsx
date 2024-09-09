import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <>
      <div className="flex mt-16 space-x-10">
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
