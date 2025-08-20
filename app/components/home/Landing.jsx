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
    <section className="relative w-full h-[70vh] flex items-center justify-center pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Modern living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Find Your Perfect
          <span className="text-blue-400"> Room</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover rooms for rent in your preferred city, neighborhood, or street.
        </p>

        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, neighborhood, or address..."
              className="w-full h-12 px-4 pr-12 text-base bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!searchQuery.trim()}
            >
              <FiSearch className="h-4 w-4" />
            </button>
          </div>
          
          {/* Search Suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-white/80 text-sm mr-2">Popular:</span>
            {["KTM", "Jhapa", "Ilam", "Pokhara"].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSearchQuery(city);
                  router.push(`/search/${city}`);
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Landing;