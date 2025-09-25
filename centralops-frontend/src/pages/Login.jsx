import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authSlice"; // adjust path

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // <-- changed from email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })); // send username, not email
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="flex min-h-screen">
        {/* Left Image */}
        <div className="w-[60%]">
          <img
            src="../src/assets/coding-pov.png"
            alt=""
            className="w-full h-full"
          />
        </div>

        {/* Right Login Form */}
        <div className="w-[40%] m-auto items-center justify-center">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-10 w-auto"
              />
              <h2 className="mt-10 text-left text-2xl/9 font-bold tracking-tight text-white">
                Sign in to your account
              </h2>
              <p className="mt-3 text-left text-sm/6 text-gray-400">
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
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      placeholder="••••••••"
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

                {/* Remember me */}
                <div className="flex inset-0 text-sm justify-between items-center">
                  <div className="flex space-x-2 items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe((prev) => !prev)}
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

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {loading ? "Logging in..." : "Sign in"}
                  </button>
                </div>

                {/* Error / Success */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {isAuthenticated && (
                  <p className="text-green-500 text-sm">Logged in as {user}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
