"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    const userDetails = await axios.get("/api/users/me");
    console.log(userDetails.data);

    setData(userDetails.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
  };

  // Automatically fetch user details on load
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <div className="p-8 bg-zinc-900 shadow-2xl rounded-lg w-full max-w-md border border-gray-800 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <hr className="mb-6 border-gray-800" />

        <p className="text-gray-400 mb-2">User ID from Database:</p>
        <div className="mb-8">
          <span className="p-2 rounded bg-blue-600/20 text-blue-400 font-mono break-all">
            {data === "nothing" ? (
              "Fetching..."
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </span>
        </div>

        <hr className="mb-8 border-gray-800" />

        <div className="flex flex-col gap-4">
          <button
            onClick={getUserDetails}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
          >
            Refresh Data
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
