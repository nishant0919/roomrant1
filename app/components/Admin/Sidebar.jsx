"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false); // For toggling sidebar on mobile

  return (
    <>
      <div className="hidden md:flex flex-col h-screen sticky top-0 left-0 p-3 w-60 bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-100 border-r border-gray-300">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Link href={"/"} className="w-20">
              <img
                src="https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-bedroom-clipart-child-s-bedroom-cartoon-illustration-vector-png-image_6798860.png"
                alt="Logo"
                className="object-contain"
              />
            </Link>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li
                className={`rounded-sm ${
                  pathname === "/admin/room"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                } hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <Link
                  rel="noopener noreferrer"
                  href="/admin/room"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FiMessageSquare className="w-5 h-5" />
                  <span>Rooms</span>
                </Link>
              </li>
              <li
                className={`rounded-sm ${
                  pathname === "/admin/booking"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                } hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <Link
                  rel="noopener noreferrer"
                  href="/admin/booking"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Bookings</span>
                </Link>
                </li>
              <li
                className={`rounded-sm ${
                  pathname === "/logout" ? "bg-gray-200 dark:bg-gray-700" : ""
                } hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <Link
                  rel="noopener noreferrer"
                  href="/logout"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <CgLogOut className="h-5 w-5" />
                  <span>LogOut</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden z-50 fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 p-2 flex justify-around">
        <Link
          href="/admin/room"
          className={`flex flex-col items-center p-2 space-y-1 ${
            pathname === "/admin/room" ? "text-blue-500" : "text-gray-600"
          } hover:text-blue-500`}
        >
          <FiMessageSquare className="w-6 h-6" />
        </Link>
        <Link
          href="/admin/booking"
          className={`flex flex-col items-center p-2 space-y-1 ${
            pathname === "/admin/booking" ? "text-blue-500" : "text-gray-600"
          } hover:text-blue-500`}
        >
          <FiCheckCircle className="w-6 h-6" />
        </Link>
               <Link
          href="/logout"
          className={`flex flex-col items-center p-2 space-y-1 ${
            pathname === "/logout" ? "text-blue-500" : "text-gray-600"
          } hover:text-blue-500`}
        >
          <CgLogOut className="w-6 h-6" />
        </Link>
      </div>
    </>
  );
}

export default Sidebar;