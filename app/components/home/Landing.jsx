"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function Landing() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery.trim()}`);
    }
  }

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center p-4 dark:bg-gray-100 dark:text-gray-800 overflow-hidden">
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Modern living room"
          className="w-full h-full object-cover"
        />
        {/* Increased opacity for a less visible image */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 text-center text-white lg:max-w-3xl px-4">
        <h1 className="text-5xl font-extrabold leading-tight tracking-wide sm:text-6xl md:text-7xl">
          Find Your Perfect
          <span className="text-violet-400"> Room</span>
        </h1>
        <p className="mt-6 mb-8 text-lg font-medium sm:text-xl">
          Search for rooms for rent in your preferred city, neighborhood, or street.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative mx-auto mt-8 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, neighborhood, or address..."
            className="w-full pl-6 pr-16 py-4 rounded-full border-2 border-transparent focus:border-violet-600 outline-none text-gray-800 shadow-lg transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-md transition-colors duration-200"
          >
            <FiSearch size={24} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Landing;