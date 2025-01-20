import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_again.png";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(
        "https://skilllinkr.ngarikev.tech/api/auth/login",
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

      const data = await res.json();

      if (res.ok) {
        const tokens = data.tokens;
        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);
        navigate("/");
      } else {
        setErrorMessage(
          data.error || "Invalid username or password. Please try again.",
        );
      }
    } catch (err) {
      setErrorMessage(
        "Unable to connect to the server. Please check your internet connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-200">
          <img
            src="https://images.pexels.com/photos/1181497/pexels-photo-1181497.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form Section */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="SkillLinkr logo"
              src={logo}
              className="mx-auto h-40 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-900">
              Welcome back!
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Show error message if exists */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
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
                    disabled={isLoading}
                    autoComplete="username"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-sky-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-sky-900 hover:text-sky-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md transition-colors ${
                    isLoading
                      ? "bg-sky-300 cursor-not-allowed"
                      : "bg-sky-900 hover:bg-sky-500"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-sky-700">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-sky-900 hover:text-sky-500"
              >
                Sign Up
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

export default Login;
