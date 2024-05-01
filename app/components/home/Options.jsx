"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Options = () => {
  const router = useRouter();
  return (
    <div
      className="flex md:flex-row flex-col gap-10 p-5 px-16 h-[38vh]
    "
    >
      <div
        className="flex  justify-center items-center h-full bg-gray-100 dark:bg-gray-800 w-full  "
        style={{
          borderRadius: "0px 90px 0 90px",
          background: `url("https://cdn-assets.roomster.com/dist/c83dfbcd25508573fb5efac548702beb.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => router.push("/add")}
      >
        <button className="   px-16 py-4 rounded-md bg-black flex justify-center items-center text-white hover:bg-white hover:text-black hover:duration-200">
          + List a place
        </button>
      </div>
      <div
        className="flex  justify-center items-center h-full bg-gray-100 dark:bg-gray-800 w-full"
        style={{
          borderRadius: "90px 0px 90px 0px",
          background: `url("https://cdn-assets.roomster.com/dist/3bc37a2da21ca15523d031141ed4535b.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => router.push("/search")}

      >
        <button className="  px-16 py-4 rounded-md bg-black flex justify-center items-center text-white hover:bg-white hover:text-black hover:duration-200">
          + Find rooms
        </button>
      </div>
    </div>
  );
};

export default Options;
