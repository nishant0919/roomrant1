"use client";
import { useRouter } from "next/navigation";
import React from "react";

function HomeButton() {
  const router = useRouter();
  return (
    <a
      onClick={(e) => router.push("/")}
      rel="noopener noreferrer"
      className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50 cursor-pointer hover:bg-violet-500 duration-300"
    >
      Back to homepage
    </a>
  );
}

export default HomeButton;
