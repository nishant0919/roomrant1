"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaDoorOpen, FaUsers } from "react-icons/fa"; // Better icons for Rooms & Users
import { CgLogOut } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen sticky top-0 left-0 p-5 w-64 bg-gray-900 text-white border-r border-gray-700 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <h1 className="text-red-500 font-bold text-[30px]">QuickRoom</h1>
          </Link>
        </div>

        <ul className="space-y-4">
          <li
            className={`${
              pathname === "/admin/room" ? "bg-gray-800" : ""
            } hover:bg-gray-800 rounded-lg`}
          >
            <Link
              href="/admin/room"
              className="flex items-center p-3 space-x-3 text-gray-300 hover:text-white"
            >
              <FaDoorOpen className="w-6 h-6" />
              <span className="text-lg">Rooms</span>
            </Link>
          </li>

          <li
            className={`${
              pathname === "/admin/users" ? "bg-gray-800" : ""
            } hover:bg-gray-800 rounded-lg`}
          >
            <Link
              href="/admin/users"
              className="flex items-center p-3 space-x-3 text-gray-300 hover:text-white"
            >
              <FaUsers className="w-6 h-6" />
              <span className="text-lg">Users</span>
            </Link>
          </li>

          <li className="hover:bg-red-700 rounded-lg">
            <button
              onClick={handleLogout}
              className="flex items-center p-3 space-x-3 w-full text-left text-gray-300 hover:text-white"
            >
              <CgLogOut className="w-6 h-6" />
              <span className="text-lg">Log Out</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-3 flex justify-around text-white">
        <Link
          href="/admin/room"
          className={`${
            pathname === "/admin/room" ? "text-blue-400" : "text-gray-400"
          } hover:text-blue-400`}
        >
          <FaDoorOpen className="w-6 h-6" />
        </Link>
        <Link
          href="/admin/users"
          className={`${
            pathname === "/admin/users" ? "text-blue-400" : "text-gray-400"
          } hover:text-blue-400`}
        >
          <FaUsers className="w-6 h-6" />
        </Link>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-500"
        >
          <CgLogOut className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default Sidebar;
