import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch(
        "https://skilllinkr.ngarikev.tech/api/auth/whoami",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-20">User not found.</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen py-16 px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-24 p-8">
          <h1 className="text-3xl font-bold text-sky-900 mb-4 text-center">
            Profile
          </h1>
          <div className="text-center">
            <h2 className="text-xl font-bold text-sky-900 mb-2">
              {user.username}
            </h2>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-sky-900 mb-2">Skills:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.skills?.map((skill) => (
                  <span
                    key={skill.name}
                    className="bg-sky-100 px-3 py-1 rounded-full text-sky-900"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
