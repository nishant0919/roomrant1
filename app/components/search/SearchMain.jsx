"use client";
import Link from "next/link";
import React from "react";
import RecentCards from "../home/RecentCards";
import Cards from "../Cards";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchMain({ data, query }) {
  const router = useRouter();
  const [queryx, setQuery] = useState("");
  if (data.length == 0) {
    return (
      <div className="p-5 flex flex-col gap-6 w-full">
        <>
          <div className=" flex justify-center items-center  bg-indigo-500 rounded-lg p-14">
            <form>
              <h1 className="text-center font-bold text-white text-4xl">
                Find the perfect room near you.
                <p className="mx-auto font-normal text-sm my-6 max-w-lg">
                  You can search for the rooms on the basis of location,
                  features or even room types.
                </p>
                <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                  <input
                    defaultValue={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        router.push("/search/" + e.target.value);
                      }
                    }}
                    className="text-base text-gray-400 flex-grow outline-none px-2 "
                    type="text"
                    placeholder="Search your Room "
                  />
                  <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/search/" + queryx);
                      }}
                      className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </h1>
            </form>
          </div>
        </>

        <div className="flex flex-row items-center gap-2 w-full ">
          <h1 className="text-2xl font-semibold">Search Result for {query}</h1>
          <p className="text-gray-600">Found {data.length} results</p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-6">
            <h1 className="text-2xl font-semibold">No Room Found</h1>
            <p className="text-gray-600">
              No room found for the search query {query}
            </p>
            <Link href="/room">View All Rooms</Link>
          </div>
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
                  defaultValue={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push("/search/" + e.target.value);
                    }
                  }}
                  className="text-base text-gray-400 flex-grow outline-none px-2 "
                  type="text"
                  placeholder="Search your Room "
                />
                <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/search/" + queryx);
                    }}
                    className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin"
                  >
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
