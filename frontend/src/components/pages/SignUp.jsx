import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_again.png";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleInput = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if (error) {
      setError(null);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const password = form.password;
    const confirmPassword = form.confirmPassword;
    console.log(form);
    console.log(password, confirmPassword);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const signUpRes = await fetch(
        "https://skilllinkr.ngarikev.tech/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            username: form.username,
            password: form.password,
            confirmPassword: form.confirmPassword,
          }),
        },
      );

      const signUpResJSON = await signUpRes.json();

      if (signUpRes.ok) {
        console.log("SignUp successful: ", signUpResJSON);

        const loginRes = await fetch(
          "https://skilllinkr.ngarikev.tech/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: form.username,
              password: form.password,
            }),
          },
        );

        const loginResJSON = await loginRes.json();

        if (loginRes.ok) {
          const accessToken = loginResJSON.tokens.access;
          const refreshToken = loginResJSON.tokens.refresh;
          localStorage.setItem("access", accessToken);
          localStorage.setItem("refresh", refreshToken);
          console.log("Login successful");
          navigate("/profile");
        } else {
          console.error("Automatic login error:", loginResJSON.error);
          setError("Automatic login failed.");
        }
      } else {
        setError(signUpResJSON.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error or server is down.");
      console.error("Signup/Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-200">
          <img
            src="https://images.pexels.com/photos/8112090/pexels-photo-8112090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Sign Up"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Sign-Up Form Section */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="SkillLinkr logo"
              src={logo}
              className="mx-auto h-40 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-900">
              Create your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-sky-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-sky-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={form.username}
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-sky-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-sky-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-sky-700">
              Already have an account?{" "}
              <Link
                to="/login" // Use Link to navigate to the sign-up page
                className="font-semibold leading-6 text-sky-900 hover:text-sky-500"
              >
                Log in
              </Link>
            </p>
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm font-semibold text-white bg-sky-900 px-4 py-2 rounded-md hover:bg-sky-500 transition-colors"
              >
                Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
