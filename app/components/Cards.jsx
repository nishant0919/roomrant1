import Link from "next/link";
import React from "react";

const Cards = ({ data }) => {
  return (
    <div>
      <Link
        href={`/room/${data._id}`}
        className="group relative block bg-black"
      >
        <img
          alt=""
          src={data.image}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
            {data.location.length > 20
              ? data.location.substring(0, 20) + "..."
              : data.location}
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">
            {data.author.name}
          </p>

          <div className="mt-32 sm:mt-48 lg:mt-64">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm text-white">
                {data.description.length > 100
                  ? data.description.substring(0, 100) + "..."
                  : data.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
