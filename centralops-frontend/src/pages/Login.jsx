import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-foreground flex">
      {/* Left Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600/20 to-indigo-900/30 items-center justify-center">
        <img
          src="../src/assets/coding-pov.png"
          alt="Coding Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-background backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            {/* <img
              alt="CentralOps"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-12 w-auto"
            /> */}
            <h1 className="text-2xl font-bold dark:text-white">
              CENTRALOPS
            </h1>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-500 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold text-[#1E2E4F] hover:text-[#31487A]"
              >
                Create new account
              </a>
            </p>
          </div>

          {/* Form */}
          <form action="#" method="POST" className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-2 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-[#1E2E4F] hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-gray-200 px-3 py-2 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-600 bg-gray-800 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-500">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
