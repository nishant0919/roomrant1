"use client";
import Link from "next/link";
import React from "react";
import { SiRoadmapdotsh } from "react-icons/si";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data, status } = useSession();
  const auth = status === "authenticated";
//!(
  if (status === "loading") return null;

  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex">
          <Link
            rel="noopener noreferrer"
            href={"/"}
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <SiRoadmapdotsh size={40} />
          </Link>
        </div>
        {(!auth && (
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <Link href={"/login"}>
              <button className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
                Log in
              </button>
            </Link>
          </div>
        )) || (
          <div className="items-center flex-shrink-0 gap-4 hidden lg:flex">
            <Link href={"/add"}>
              <button className="px-8 py-2 bg-black text-white hover:bg-red-400 hover:text-black hover:duration-200 rounded-md">
                {" "}
                + Add room
              </button>
            </Link>
            <Link
              href={"/user"}
              className="flex items-center p-2"
              rel="noopener noreferrer"
            >
              <img
                src={data?.user?.image}
                className="h-10 w-10 rounded-full"
                alt=""
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
        )}
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
