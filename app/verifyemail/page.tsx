"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";

export default function VerifyEmailPage() {
  //   const router = useRouter()
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      // This gets the message from your NextResponse.json({error: "..."})
      const message =
        error.response?.data?.error || "Email verification failed";
      toast.error(message);
      console.log(error.response?.data);
    }
  };
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // other approach
    // const {query} = router
    // const urlToken = query.token
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <div className="p-8 bg-zinc-900 shadow-2xl rounded-lg w-full max-w-md border border-gray-800 text-center">
        <h1 className="text-3xl font-bold mb-4">Verify Email</h1>

        {/* Token Status Badge */}
        <div className="mb-8 ">
          <h2
            className={`p-2 rounded-md inline-block text-sm font-mono break-all max-w-full ${
              token
                ? "bg-blue-600/20 text-blue-400"
                : "bg-orange-600/20 text-orange-400"
            }`}
          >
            {token ? `${token}` : "No token found"}
          </h2>
        </div>

        <hr className="mb-8 border-gray-800" />

        {/* Success State */}
        {verified && (
          <div className="space-y-4">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-semibold text-green-500">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-400">
              You can now access all features of your account.
            </p>
            <Link
              href="/login"
              className="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="space-y-4">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-red-500">
              Verification Failed
            </h2>
            <p className="text-gray-400">
              The token is invalid or has expired. Please request a new
              verification email.
            </p>
            <Link
              href="/signup"
              className="block w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-700 border border-gray-700 transition"
            >
              Back to Signup
            </Link>
          </div>
        )}

        {/* Processing State (If neither success nor error yet) */}
        {!verified && !error && (
          <div className="space-y-6">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
            <p className="text-gray-400">
              Verifying your email address, please wait...
            </p>

            {/* Manual Verify Button (Optional) */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold">
              Verify Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
