import React from "react";
import Cards from "../Cards";

function RecentCards({ data }) {
  // Check if data is a valid array and not empty
  if (!Array.isArray(data) || data.length === 0) {
    // Optionally, you can return a message or null if there's no data
    return (
      <div className="flex flex-col gap-5 p-4 pt-10 text-center text-gray-500">
        <h2 className="text-4xl pl-8">
          View recently added rooms
        </h2>
        <p>No rooms found at this time.</p>
      </div>
    );
  }

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
        {data
          .slice(0, 6)
          .map(
            (room, index) =>
              room.approved === true && <Cards key={index} data={room} />
          )}
      </div>
    </div>
  );
}

export default RecentCards;