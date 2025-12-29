"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/profile");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Signup failed");
        console.log("Signup failed");
      }
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 bg-zinc-800 shadow-2xl rounded-lg w-full max-w-md border border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          {loading ? "Processing..." : "Create an Account"}
        </h1>
        <hr className="mb-6 border-gray-600" />

        <form onSubmit={onSignup} className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full p-2 mt-1 bg-zinc-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full p-2 mt-1 bg-zinc-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-2 mt-1 bg-zinc-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md transition duration-200 font-semibold mt-4
          ${
            buttonDisabled || loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
            onClick={onSignup}
          >
            {buttonDisabled ? "No Sign Up" : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Visit Login page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
