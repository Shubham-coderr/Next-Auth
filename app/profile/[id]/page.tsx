"use client";
import React, { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

// In Next.js App Router, params is passed as a prop to the component
export default function UserProfile({ params }: PageProps) {
  //? Unwrap params Promise
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <div className="p-8 bg-zinc-900 shadow-2xl rounded-lg w-full max-w-md border border-gray-800 text-center">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <hr className="mb-6 border-gray-800" />

        <p className="text-gray-400 mb-4">You are viewing the profile of:</p>

        <div className="mb-6">
          <span className="p-3 rounded bg-orange-600 text-black font-bold text-lg break-all">
            {id}
          </span>
        </div>

        <hr className="mb-6 border-gray-800" />

        <button
          onClick={() => window.history.back()}
          className="text-sm text-blue-500 hover:text-blue-400 transition"
        >
          ← Back to Profile
        </button>
      </div>
    </div>
  );
}
