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
      alert("Error fetching data");
      navigate.push("/");
      return alert("Error fetching data");
    }
  }

  function navTo(e) {
    navigate.push("/room/" + e);
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">
                {data.rooms.length}
              </p>{" "}
              <p className="text-gray-400">Room Posted</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">
                {data.booked.length}
              </p>{" "}
              <p className="text-gray-400">Room Booked</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img
                src={data.user.image}
                alt="profile"
                className="w-48 h-48 rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>{" "}
          </div>{" "}
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              onClick={signOut}
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              {" "}
              LogOut
            </button>{" "}
          </div>
        </div>{" "}
        <div className="mt-20 text-center border-b pb-12">
          {" "}
          <h1 className="text-4xl font-medium text-gray-700">
            {data.user.name}
          </h1>{" "}
          <p className="font-light text-gray-600 mt-3">{data.user.email}</p>{" "}
          <p className="mt-8 text-gray-500">@{data.user.username} </p>{" "}
        </div>{" "}
        {data.rooms.length !== 0 && (
          <div className="flex pt-5 flex-col gap-3">
            <h2 className="text-2xl font-bold">Room Posted</h2>
            <div
              className="grid 
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-3
          "
            >
              {data.rooms.map((room, index) => (
                <div
                  onClick={() => {
                    navTo(room._id);
                  }}
                  key={index}
                  className="bg-white shadow rounded-md p-4"
                >
                  <img
                    src={room.image}
                    alt=""
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h2 className="text-lg font-bold mt-2">
                    {room.location.length > 20
                      ? room.location.slice(0, 20) + "..."
                      : room.location}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {room.description.length > 40
                      ? room.description.slice(0, 40) + "..."
                      : room.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Posted On : {moment(room.createdAt).fromNow()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.booked.length !== 0 && (
          <div className="flex pt-5 flex-col gap-3">
            <h2 className="text-2xl font-bold">Room Posted</h2>
            <div
              className="grid 
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-3
          "
            >
              {data.booked.map((book, index) => (
                <div
                  onClick={() => {
                    navTo(book.room._id);
                  }}
                  key={index}
                  className="bg-white shadow rounded-md p-4"
                >
                  <img
                    src={book.room.image}
                    alt=""
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h2 className="text-lg font-bold mt-2">
                    {book.room.location.length > 20
                      ? book.room.location.slice(0, 20) + "..."
                      : book.room.location}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {book.room.description.length > 40
                      ? book.room.description.slice(0, 40) + "..."
                      : book.room.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Booked On : {moment(book.createdAt).fromNow()}
                  </p>
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
