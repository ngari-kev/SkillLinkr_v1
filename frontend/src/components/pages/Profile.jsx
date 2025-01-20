import React, { useState, useEffect } from "react";
import { authenticatedFetch } from "../../utils/api";
import Header from "../Header";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [skillError, setSkillError] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchSkills();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authenticatedFetch(
        "https://skilllinkr.ngarikev.tech/api/auth/whoami",
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile data:", data);
      setUser(data);
    } catch (error) {
      setError(error.message);
      if (error.message.includes("Session expired")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await authenticatedFetch(
        "https://skilllinkr.ngarikev.tech/api/skills/my-skills",
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Skills data:", data);
      setSkills(data.skills || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkillError("Failed to fetch skills");
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setSkillError("");

    if (!newSkill.trim()) {
      setSkillError("Skill name cannot be empty");
      return;
    }

    try {
      const response = await authenticatedFetch(
        "https://skilllinkr.ngarikev.tech/api/skills/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skill_name: newSkill.trim() }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add skill");
      }

      await fetchSkills();
      setNewSkill("");
    } catch (error) {
      setSkillError(error.message);
    }
  };

  const handleRemoveSkill = async (skillName) => {
    try {
      const response = await authenticatedFetch(
        `https://skilllinkr.ngarikev.tech/api/skills/remove/${skillName}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove skill");
      }

      await fetchSkills();
    } catch (error) {
      setSkillError(error.message);
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
            <p className="text-sky-700 mb-6">{user.email}</p>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="mb-6">
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter new skill"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
                >
                  Add Skill
                </button>
                {skillError && (
                  <p className="text-red-500 text-sm">{skillError}</p>
                )}
              </div>
            </form>

            {/* Skills List */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-sky-900 mb-4">
                My Skills:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-sky-100 px-3 py-1 rounded-full text-sky-900 flex items-center"
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
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
