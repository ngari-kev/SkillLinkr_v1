import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_again.png";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("https://skilllinkr.ngarikev.tech/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      console.log(res);
      console.log(form);

      if (res.ok) {
        const resJSON = await res.text();
        console.log(resJSON);
        const accessToken = resJSON.tokens.access;
        const refreshToken = resJSON.tokens.refresh;
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        console.log("Login successful");
        navigate("/home");
      } else {
        const errorData = await res.json();
        console.error("Login error:", errorData.error);
        setErrorMessage(
          errorData.error || "Login failed. Please check your credentials.",
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Network error or server is down.");
    }
  };

  return (
    <>
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
              <form
                onSubmit={handleLogin}
                action="#"
                method="POST"
                className="space-y-6"
              >
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                      onInput={handleInput}
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
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                      onInput={handleInput}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    Log in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-sky-700">
                Not a member?{" "}
                <Link
                  to="/signup" // Use Link to navigate to the sign-up page
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
    </>
  );
};

export default Login;
