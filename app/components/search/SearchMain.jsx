"use client";
import Link from "next/link";
import React from "react";
import RecentCards from "../home/RecentCards";
import Cards from "../Cards";

function SearchMain({ data, query }) {
  if (data.length == 0) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
          <p className="mb-4 text-lg text-gray-600">
            No results found for <span className="text-red-500">{query}</span>
          </p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <p className="mt-4 text-gray-600">
            Let's get you back{" "}
            <Link href="/" className="text-blue-500">
              home
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-5 flex flex-col gap-6 w-full">
      <>
        <div className=" flex justify-center items-center  bg-indigo-500 rounded-lg p-14">
          <form>
            <h1 className="text-center font-bold text-white text-4xl">
              Find the perfect room near you.
              <p className="mx-auto font-normal text-sm my-6 max-w-lg">
                You can search for the rooms on the basis of location, features
                or even room types.
              </p>
              <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                <input
                  className="text-base text-gray-400 flex-grow outline-none px-2 "
                  type="text"
                  placeholder="Search your domain name"
                />
                <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                  <select
                    id="Com"
                    className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                  >
                    <option value="com" selected="">
                      com
                    </option>
                    <option value="net">net</option>
                    <option value="org">org</option>
                    <option value="io">io</option>
                  </select>
                  <button className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
                    Search
                  </button>
                </div>
              </div>
            </h1>
          </form>
        </div>
      </>

      <div className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-semibold">Search Result for {query}</h1>
        <p className="text-gray-600">Found {data.length} results</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <Cards key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default SearchMain;