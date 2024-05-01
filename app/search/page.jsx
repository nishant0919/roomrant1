"use client";
import React from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [queryx, setQuery] = React.useState("");
  return (
    <div>
      <div className=" flex justify-center items-center  bg-indigo-500  p-14 h-[84vh]">
        <form>
          <h1 className="text-center font-bold text-white text-4xl">
            Find the perfect room near you.
            <p className="mx-auto font-normal text-sm my-6 max-w-lg">
              You can search for the rooms on the basis of location, features or
              even room types.
            </p>
            <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
              <input
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
    </div>
  );
}

export default page;
