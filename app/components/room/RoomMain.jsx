"use client";

import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import moment from "moment";
import RMDescription from "./RMDescription";
import RmMap from "./RmMap";
import RMFeatures from "./RMFeatures"; // Added this component

function RoomMain({ data, id, booked }) {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const images = data?.images || [];
  const [selectedImage, setSelectedImage] = useState(images[0]?.url || "https://via.placeholder.com/1200x800");

  const isAuth = status === "authenticated";
  const isOwner = isAuth && sessionData?.user?.email === data?.author?.email;

  const checkifBookedByUser = () => {
    return booked?.find((book) => book?.user?.email === sessionData?.user?.email);
  };

  async function bookNow() {
    // Booking logic remains the same
  }

  async function unBookNow() {
    // Unbooking logic remains the same
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 min-h-screen">
      {/* Left Panel: All Room Details */}
      <div className="flex flex-col gap-8 w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 lg:p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center w-max gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          <AiOutlineLeft size={16} />
          <span>Go Back</span>
        </button>

        {/* Title and Price */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{data?.title || "Room Details"}</h1>
          <p className="text-2xl font-bold text-violet-600">
            Rs.{data?.rent || "N/A"}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">About this Room</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "No description available."}
          </p>
        </div>

        {/* Features (using the refactored RMFeatures component) */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Features</h2>
          <RMFeatures data={data} />
        </div>

        {/* Location Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Location</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.location || "No location provided."}
          </p>
          <div className="mt-4 rounded-lg overflow-hidden shadow-md">
            <RmMap address={data?.location || "Kachankawal Digital"} />
          </div>
        </div>

        {/* Owner Information */}
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl font-bold">Owner Information</h2>
          <div className="flex items-center gap-4">
            <img
              src={data?.author?.image || "https://via.placeholder.com/150"}
              referrerPolicy="no-referrer"
              alt={data?.author?.name || "Owner Image"}
              className="w-16 h-16 rounded-full ring-2 ring-violet-600"
            />
            <div>
              <h3 className="text-lg font-bold">{data?.author?.name || "Unknown Owner"}</h3>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                @{data?.author?.username || "unknown"}
              </span>
            </div>
          </div>
          <button className="w-full px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors duration-300">
            <a href={`mailto:${data?.author?.email || ""}`} className="text-white">
              Contact the owner
            </a>
          </button>
        </div>

        {/* Booking & Action Buttons */}
        {isAuth ? (
          <div className="flex flex-col w-full mt-4">
            {isOwner ? (
              <button
                onClick={() => router.push(`/books/${id}`)} // You might need a new route for this
                className="w-full px-6 py-3 text-white bg-violet-600 rounded-md shadow-md hover:bg-violet-700 transition-colors duration-300"
              >
                View Bookings
              </button>
            ) : (
              <>
                {!checkifBookedByUser() ? (
                  <button
                    onClick={bookNow}
                    className="w-full px-6 py-3 text-white bg-violet-600 rounded-md shadow-md hover:bg-violet-700 transition-colors duration-300"
                  >
                    Book Now
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
                    >
                      Unbook Now
                    </button>
                  </>
                )}
              </>
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

      {/* Right Panel: Image Gallery */}
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <div className="relative rounded-lg shadow-lg overflow-hidden h-96 sm:h-[450px] lg:h-[550px]">
          <img
            src={selectedImage}
            alt={data?.title || "Main Room Image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden h-24 sm:h-28 cursor-pointer transition-transform duration-200 hover:scale-105 ${selectedImage === image.url ? 'ring-2 ring-violet-600' : ''}`}
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={`Room Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomMain;