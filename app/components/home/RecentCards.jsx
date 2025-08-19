// app/components/home/RecentCards.jsx

import React from "react";
import Cards from "../Cards";

function RecentCards({ data }) {
  // Add console logs to inspect the data prop
  console.log("RecentCards received data:", data);
  console.log("Data length:", data.length);

  // Check if data is a valid array and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col gap-5 p-4 pt-10 text-center text-gray-500">
        <h2 className="text-4xl pl-8">
          View recently added rooms
        </h2>
        <p>No rooms found at this time.</p>
      </div>
    );
  }

  // Debugging the filtering loop
  const approvedRooms = data.slice(0, 6).filter(room => {
    // Check each room's approved status
    const isApproved = room.approved === true;
    console.log(`Checking room with _id: ${room._id}, approved status: ${room.approved}, is boolean true?: ${isApproved}`);
    return isApproved;
  });

  console.log("Filtered Approved Rooms:", approvedRooms);
  console.log("Approved Rooms Count:", approvedRooms.length);


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
        {approvedRooms.map((room, index) => (
          <Cards key={index} data={room} />
        ))}
      </div>
    </div>
  );
}

export default RecentCards;