import React from 'react'
// import LandingPage from '../LandingPage'

const About = () => {
  return (
    <>
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <img src="path/to/your-company-logo.png" alt="Company Logo" className="w-48 h-48 mb-4" />
          <p className="text-lg text-gray-700">
            We're dedicated to bridging the gap between skilled workers and employers. Our platform provides a convenient and efficient way for both parties to connect, collaborate, and thrive.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ul className="list-disc space-y-4">
            <li>
              <p className="text-gray-700">
                1. **Create an account:** Employers and workers can easily sign up on our platform.
              </p>
            </li>
            <li>
              <p className="text-gray-700">
                2. **Build your profile:** Showcase your skills, experience, and qualifications.
              </p>
            </li>
            <li>
              <p className="text-gray-700">
                3. **Search and connect:** Employers can find suitable candidates, while workers can discover relevant job opportunities.
              </p>
            </li>
            <li>
              <p className="text-gray-700">
                4. **Collaborate and succeed:** Once a match is found, employers and workers can directly communicate and collaborate on projects.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};


export default About
