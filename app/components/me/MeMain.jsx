"use client";
import moment from "moment";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MeMain() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useRouter();

  async function fetchMe() {
    const response = await fetch("/api/me");
    const data = await response.json();
    if (data.status === 200) {
      setData(data.body);
      setLoading(false);
    } else {
      navigate.push("/");
      alert("Error fetching data");
    }
  }

  function navTo(id) {
    navigate.push(`/room/${id}`);
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500"></div>
      </div>
    );

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={data.user.image}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl font-semibold text-gray-700 mt-4">
            {data.user.name}
          </h1>
          <p className="text-gray-500">{data.user.email}</p>
          <p className="mt-2 text-gray-500">@{data.user.username}</p>

          <button
            onClick={signOut}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-xl font-bold text-indigo-600">
              {data.rooms.length}
            </p>
            <p className="text-gray-600">Rooms Posted</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-xl font-bold text-indigo-600">
              {data.booked.length}
            </p>
            <p className="text-gray-600">Rooms Booked</p>
          </div>
        </div>

        {/* Rooms Section */}
        {data.rooms.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Rooms Posted</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {data.rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => navTo(room._id)}
                  className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
                >
                  <img
                    src={room.image}
                    alt="Room"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {room.location.length > 20
                        ? room.location.slice(0, 20) + "..."
                        : room.location}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {room.description.length > 40
                        ? room.description.slice(0, 40) + "..."
                        : room.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Posted {moment(room.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.booked.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Rooms Booked</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {data.booked.map((book) => (
                <div
                  key={book.room._id}
                  onClick={() => navTo(book.room._id)}
                  className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
                >
                  <img
                    src={book.room.image}
                    alt="Room"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {book.room.location.length > 20
                        ? book.room.location.slice(0, 20) + "..."
                        : book.room.location}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {book.room.description.length > 40
                        ? book.room.description.slice(0, 40) + "..."
                        : book.room.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Booked {moment(book.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeMain;
