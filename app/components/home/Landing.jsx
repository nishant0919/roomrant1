import React from "react";

function Landing() {
  return (
    <section className="dark:bg-gray-100 w-full dark:text-gray-800 h-[80vh]  p-8">
      <div className="flex flex-col justify-center lg:flex-row lg:justify-between">
        <div
          className="flex flex-col justify-center text-center rounded-sm 
        lg:w-1/2
        lg:text-left"
        >
          <h1 className="text-5xl font-bold leading-none sm:text-6xl">
            Room For
            <span className="dark:text-violet-600"> Rent</span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Find and rent your perfect room
            <br className="hidden md:inline lg:hidden" />
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <input
              type="text"
              placeholder="Enter an address"
              className="p-5 w-full rounded-md border border-black outline-none shadow-md"
            />
          </div>
        </div>
        <div
          className=" items-center justify-center 
        lg:w-1/2
        w-full
        md:flex
        hidden
        "
        >
          <img
            src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-living-room-vector-png-image_12161381.png"
            alt=""
            className="object-contain h-[400px] "
          />
        </div>
      </div>
    </section>
  );
}

export default Landing;
