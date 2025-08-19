"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import RMFeatures from "./RMFeatures";

function RMDescription({ router, data, user, id, booked }) {
  const { status } = useSession();
  const [bookLoading, setBookLoading] = useState(false);
  const [unbookLoading, setUnbookLoading] = useState(false);
  const isAuth = status === "authenticated";

  const checkifBookedByUser = () => {
    return booked?.find((book) => book?.user?.email === user?.email);
  };

  async function bookNow() {
    setBookLoading(true);
    try {
      const res = await fetch(`/api/booked/${id}`);
      const result = await res.json();
      if (result.status === 200) {
        alert("Room Booked Successfully");
        router.refresh();
      } else {
        alert("Error Booking Room");
      }
    } catch (err) {
      console.error("Error booking the room:", err);
      alert("Error Booking Room");
    } finally {
      setBookLoading(false);
    }
  }

  async function unBookNow() {
    setUnbookLoading(true);
    try {
      const res = await fetch(`/api/umbook/${id}`);
      const result = await res.json();
      if (result.status === 200) {
        alert("Room Unbooked Successfully");
        router.refresh();
      } else {
        alert("Error Unbooking Room");
      }
    } catch (err) {
      console.error("Error unbooking the room:", err);
      alert("Error Unbooking Room");
    } finally {
      setUnbookLoading(false);
    }
  }

  return (
    <motion.div
      className="p-2 flex flex-col gap-6"
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">About this Room</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {data?.description || "No description available."}
        </p>
      </div>

      <RMFeatures data={data} />
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Location</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.location || "No location provided."}
          </p>
        </div>

        {/* Booking & Action Buttons */}
        {isAuth ? (
          <div className="flex flex-col w-full mt-4">
            {user?.email !== data?.author?.email ? (
              !checkifBookedByUser() ? (
                <button
                  onClick={bookNow}
                  className="w-full px-6 py-3 text-white bg-violet-600 rounded-md shadow-md hover:bg-violet-700 transition-colors duration-300"
                  disabled={bookLoading}
                >
                  {bookLoading ? "Booking..." : "Book Now"}
                </button>
              ) : (
                <>
                  <button
                    className="w-full px-6 py-3 text-white bg-green-600 rounded-md shadow-md cursor-not-allowed"
                    disabled
                  >
                    Already Booked by You
                  </button>
                  <button
                    onClick={unBookNow}
                    className="w-full px-6 py-3 mt-3 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition-colors duration-300"
                    disabled={unbookLoading}
                  >
                    {unbookLoading ? "Unbooking..." : "Unbook Now"}
                  </button>
                </>
              )
            ) : (
              <button
                onClick={() => setActive("books")}
                className="w-full px-6 py-3 text-white bg-violet-600 rounded-md shadow-md hover:bg-violet-700 transition-colors duration-300"
              >
                View Bookings
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="w-full px-6 py-3 text-white bg-violet-600 rounded-md shadow-md hover:bg-violet-700 transition-colors duration-300"
          >
            Login to Book
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default RMDescription;