"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import RecentCards from "../home/RecentCards";
import Cards from "../Cards";

function SearchMain({ data, query }) {
  const router = useRouter();
  const [queryx, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (queryx.trim()) {
      router.push("/search/" + queryx);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center bg-indigo-500 rounded-lg p-14 shadow-lg"
      >
        <form onSubmit={handleSearch} className="w-full max-w-lg text-center">
          <h1 className="text-4xl font-bold text-white">
            Find the perfect room near you.
          </h1>
          <p className="text-white text-sm mt-4">
            Search by location, features, or room type.
          </p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden px-2 py-2 mt-6 shadow-md">
            <input
              value={queryx}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(e);
              }}
              className="text-base text-gray-700 flex-grow outline-none px-2 py-2"
              type="text"
              placeholder="Search your Room..."
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white text-base rounded-lg px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-row items-center gap-2"
      >
        <h1 className="text-2xl font-semibold">Search Result for "{query}"</h1>
        <p className="text-gray-600">Found {data.length} results</p>
      </motion.div>

      {data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 mt-6 text-center"
        >
          <h1 className="text-2xl font-semibold">No Room Found</h1>
          <p className="text-gray-600">No results for "{query}"</p>
          <Link
            href="/room"
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            View All Rooms
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {data.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: item.id * 0.1 }}
            >
              <Cards data={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default SearchMain;
