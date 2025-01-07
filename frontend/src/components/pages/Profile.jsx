import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";
import { FaUserCircle, FaPlus, FaTimes } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("profile_image", file);

      try {
        const response = await fetch(
          "http://localhost:5000/users/upload-photo",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: formData,
          },
        );

        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.image_url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/skills/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ skill_name: newSkill }),
      });

      if (response.ok) {
        fetchProfile();
        setNewSkill("");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleRemoveSkill = async (skillName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/skills/remove/${skillName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );

      if (response.ok) {
        fetchProfile();
      }
    } catch (error) {
      console.error("Error removing skill:", error);
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
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-24">
          <div className="md:flex">
            {/* Profile Image Section */}
            <div className="md:w-1/3 bg-sky-900 p-8 text-center">
              <div className="relative inline-block">
                {imagePreview || profileImage ? (
                  <img
                    src={imagePreview || profileImage}
                    alt="Profile"
                    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-40 h-40 text-white mx-auto mb-4" />
                )}
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-lg">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <FaPlus className="text-sky-900" />
                </label>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {user.username}
              </h2>
              <p className="text-sky-200">{user.email}</p>
            </div>

            {/* Skills Section */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold text-sky-900 mb-6">Skills</h3>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Add a new skill..."
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-900 text-white rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Add Skill
                  </button>
                </div>
              </form>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-sky-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sky-900">{skill.name}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="text-sky-900 hover:text-sky-700"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
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
