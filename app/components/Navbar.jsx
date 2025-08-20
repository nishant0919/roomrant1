"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SiRoadmapdotsh } from "react-icons/si";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5";

function Navbar() {
  const { data, status } = useSession();
  const auth = status === "authenticated";
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    async function fetchRole() {
      if (auth) {
        const res = await fetch("/api/user/role");
        const data = await res.json();
        setRole(data.role);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setRole(null);
      }
    }
    fetchRole();
  }, [auth]);

  const hideNavbar = path.includes("/admin") && role !== "admin";

  if (hideNavbar) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and QuickRoom text */}
          <Link href={"/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <SiRoadmapdotsh size={24} className="text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">QuickRoom</span>
          </Link>

          {/* Desktop Navigation Menus (centered) */}
          <nav className="hidden lg:flex flex-grow justify-center">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative text-base font-medium transition-colors hover:text-blue-600 ${
                      path === link.href ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.name}
                    {path === link.href && (
                      <span className="absolute left-0 bottom-[-5px] h-0.5 w-full bg-blue-600 rounded-full animate-underline-grow"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth/User Section */}
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md animate-pulse">
                Loading...
              </div>
            ) : !auth ? (
              <Link href={"/login"}>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Log in
                </button>
              </Link>
            ) : (
              <>
                {!isLoading && (
                  <>
                    {role === "user" && (
                      <Link href={"/add"}>
                        <button className="px-6 py-2 bg-black text-white hover:bg-violet-600 hover:text-white transition-colors rounded-md">
                          + Add room
                        </button>
                      </Link>
                    )}
                    {role === "admin" && (
                      <Link href={"/admin"}>
                        <button className="px-6 py-2 bg-black text-white hover:bg-violet-600 hover:text-white transition-colors rounded-md">
                          Admin
                        </button>
                      </Link>
                    )}
                  </>
                )}
                <Link href={"/user"}>
                  <img
                    src={data?.user?.image || "https://www.gravatar.com/avatar/?d=mp"}
                    className="h-9 w-9 rounded-full ring-2 ring-blue-600"
                    alt="User Profile"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </>
            )}

            {/* Mobile menu toggle button */}
            <button
              className="lg:hidden p-2 text-gray-800 dark:text-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <IoClose size={28} />
              ) : (
                <IoMenu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-white dark:bg-gray-900 shadow-md`}
        >
          <ul className="flex flex-col items-start gap-4 p-4">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full">
                <Link
                  href={link.href}
                  className={`block w-full p-2 text-base rounded-md transition-colors ${
                    path === link.href
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Embedded CSS for the underline animation */}
      <style jsx>{`
        @keyframes underline-grow {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .animate-underline-grow {
          animation: underline-grow 0.3s forwards;
        }
      `}</style>
    </>
  );
}

export default Navbar;