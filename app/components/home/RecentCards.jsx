import React from "react";
import Cards from "../Cards";

function RecentCards({ data }) {
  return (
    <div className="flex flex-col gap-5 p-4 pt-10">
      <h2
        className="
        text-4xl
        pl-8
      "
      >
        View recently added rooms
      </h2>
      <div
        className="grid
        grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
        p-4
      "
      >
        {data.slice(0, 6).map((room, index) => (
          <Cards key={index} data={room} />
        ))}
      </div>
    </div>
  );
}

export default RecentCards;
