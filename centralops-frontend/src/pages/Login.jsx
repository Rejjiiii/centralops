import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/authSlice"; // import the login thunk

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.token) {
        navigate("/dashboard"); // Redirect after login success
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="flex min-h-screen">
        {/* LEFT SIDE IMAGE */}
        <div className="w-[60%]">
          <img
            src="../src/assets/coding-pov.png"
            alt=""
            className="w-full h-full"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-[40%] m-auto items-center justify-center">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-10 w-auto"
              />
              <h2 className="mt-10 text-left text-2xl font-bold tracking-tight text-white">
                Sign in to your account
              </h2>
              <p className="mt-3 text-left text-sm text-gray-400">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Create new account
                </a>
              </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {/* hook up handleSubmit here */}
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email} // ✅ controlled
                      onChange={(e) => setEmail(e.target.value)} // ✅ update state
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password} // ✅ controlled
                      onChange={(e) => setPassword(e.target.value)} // ✅ update state
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-400 hover:text-indigo-500"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex text-sm justify-between items-center">
                  <div className="flex space-x-2 items-center">
                    <input
                      type="checkbox"
                      className="bg-white/10 border rounded-2xl"
                    />
                    <p>Remember me?</p>
                  </div>

                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading} // ✅ disable when loading
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:bg-gray-400"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                {/* show error if login failed */}
                {error && (
                  <p className="mt-3 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
