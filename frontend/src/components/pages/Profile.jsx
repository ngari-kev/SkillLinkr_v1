import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch("http://localhost:5000/auth/whoami", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center">User not found.</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-16 px-8 bg-slate-100">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-24">
          <h2 className="text-3xl font-bold text-sky-900 mb-6">Your Profile</h2>
          <div className="text-sky-700">
            <p className="mb-3">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
