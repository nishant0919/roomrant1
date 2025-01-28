import React, { useState } from "react";
import RMFeatures from "./RMFeatures";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

function RMDescription({ router, data, user, id, booked, setActive }) {
  const { status } = useSession();
  const [bookLoading, setBookLoading] = useState(false);
  const [unbookLoading, setUnbookLoading] = useState(false);
  const isAuth = status === "authenticated";

  const checkifBookedByUser = () => {
    // Use optional chaining to avoid issues if `booked` or `user` is undefined
    return booked?.find((book) => book?.user?.email === user?.email);
  };

  function bookNow() {
    setBookLoading(true);
    fetch(`/api/booked/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert("Room Booked Successfully");
          setBookLoading(false);
          router.refresh();
        } else {
          setBookLoading(false);
          alert("Error Booking Room");
        }
      })
      .catch((err) => {
        console.error("Error booking the room:", err);
        setBookLoading(false);
        alert("Error Booking Room");
      });
  }

  function unBookNow() {
    setUnbookLoading(true);
    fetch(`/api/umbook/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUnbookLoading(false);
          alert("Room Unbooked Successfully");
          router.refresh();
        } else {
          setUnbookLoading(false);
          alert("Error Unbooking Room");
        }
      })
      .catch((err) => {
        console.error("Error unbooking the room:", err);
        setUnbookLoading(false);
        alert("Error Unbooking Room");
      });
  }

  return (
    <motion.div
      className="p-2 flex flex-col gap-2"
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, opacity: 0 }}
    >
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {data?.description || "No description available."}
      </p>
      <RMFeatures data={data} />
      {/* Location */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">Location</h3>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {data?.location || "No location provided."}
          </p>
        </div>
        {/* Book Now Button */}
        {isAuth ? (
          <div className="flex w-full">
            {(user?.email !== data?.author?.email && (
              <div className="flex w-full flex-col">
                {!checkifBookedByUser() ? (
                  <button
                    onClick={bookNow}
                    className="bg-purple-600 mt-5 w-full hover:bg-purple-700 duration-300 text-white py-2 rounded-md"
                  >
                    {bookLoading ? "Booking..." : "Book Now"}
                  </button>
                ) : (
                  <button
                    className="bg-green-600 mt-5 w-full hover:bg-green-700 duration-300 text-white py-2 rounded-md"
                    disabled
                  >
                    Already Booked by You
                  </button>
                )}
                {checkifBookedByUser() && (
                  <button
                    onClick={unBookNow}
                    className="bg-red-600 mt-5 w-full hover:bg-red-700 duration-300 text-white py-2 rounded-md"
                  >
                    {unbookLoading ? "Unbooking..." : "Unbook Now"}
                  </button>
                )}
              </div>
            )) || (
              <button
                onClick={() => setActive("books")}
                className="bg-green-600 mt-5 w-full hover:bg-green-700 duration-300 text-white py-2 rounded-md"
              >
                View Bookings
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-purple-600 mt-5 hover:bg-purple-700 duration-300 text-white py-2 rounded-md"
          >
            Login to Book
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default RMDescription;
