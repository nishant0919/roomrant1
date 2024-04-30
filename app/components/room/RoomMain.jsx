"use client";
import React, { useState } from "react";
import RMDescription from "./RMDescription";
import RMFeatures from "./RMFeatures";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import RmMap from "./RmMap";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import moment from "moment";

function RoomMain({ data, id, booked }) {
  const router = useRouter();
  const [active, setActive] = useState("description");
  const { data: sessionData, status } = useSession();
  let isAuth = false;
  if (status === "authenticated") {
    isAuth = sessionData.user.email === data.author.email;
  } else {
    let isAuth = false;
  }
  return (
    <div className="flex relative flex-col md:flex-row gap-2 min-h-screen">
      <div
        className="flex  h-[98vh] sticky top-2 left-0 rounded-md overflow-hidden  md:w-2/3 w-full bg-red-300"
        style={{
          background: `url('${data.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          onClick={(e) => router.back()}
          className="flex h-10 w-10 bg-gray-200 ml-2 mt-2 cursor-pointer hover:opacity-55 duration-300 justify-center items-center bg-opacity-70 rounded-full"
        >
          <AiOutlineLeft className="m-auto" />
        </div>
      </div>
      <div className="flex flex-col justify-start md:w-1/3 w-full overflow-hidden">
        <div className="flex w-full justify-center items-center">
          <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap ">
            <a
              rel="noopener noreferrer"
              onClick={(e) => setActive("description")}
              className={`flex items-center flex-shrink-0 duration-300 transition-all cursor-pointer hover:border-gray-400 px-5 py-2 border-b-4 ${
                active == "description"
                  ? "border-purple-600"
                  : "border-gray-300"
              } text-gray-600`}
            >
              Description
            </a>
            <a
              rel="noopener noreferrer"
              onClick={(e) => setActive("owner")}
              className={`flex items-center flex-shrink-0 duration-300 transition-all cursor-pointer hover:border-gray-400 px-5 py-2 border-b-4 ${
                active == "owner" ? "border-purple-600" : "border-gray-300"
              } text-gray-600`}
            >
              Owner
            </a>
            <a
              rel="noopener noreferrer"
              onClick={(e) => setActive("location")}
              className={`flex items-center flex-shrink-0 duration-300 transition-all cursor-pointer hover:border-gray-400 px-5 py-2 border-b-4 ${
                active == "location" ? "border-purple-600" : "border-gray-300"
              } text-gray-600`}
            >
              Location
            </a>
            {isAuth && (
              <a
                rel="noopener noreferrer"
                onClick={(e) => setActive("books")}
                className={`flex items-center flex-shrink-0 duration-300 transition-all cursor-pointer hover:border-gray-400 px-5 py-2 border-b-4 ${
                  active == "books" ? "border-purple-600" : "border-gray-300"
                } text-gray-600`}
              >
                Books
              </a>
            )}
          </div>
        </div>
        {active == "description" && (
          <RMDescription
            setActive={setActive}
            data={data}
            router={router}
            user={sessionData?.user}
            booked={booked}
            id={id}
          />
        )}
        {active == "location" && (
          <RmMap
            address={!!data.location ? data.location : "Kachankawal Digital"}
          />
        )}
        {active == "owner" && (
          <motion.div
            className="flex flex-col max-w-md p-6 "
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
          >
            <img
              src={data.author.image}
              referrerPolicy="no-referrer"
              alt=""
              className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 = aspect-square"
            />
            <div>
              <h2 className="text-xl font-semibold">{data.author.name}</h2>
              <span className="block pb-2 text-sm dark:text-gray-600">
                @{data.author.username}
              </span>
              <button className="bg-purple-600 mt-5 p-2 hover:bg-purple-700 duration-300 text-white py-2 rounded-md">
                <a href={`mailto:${data.author.email}`} className="text-white">
                  Contact the owner
                </a>
              </button>
            </div>
          </motion.div>
        )}
        {active == "books" && (
          <motion.div
            className="flex flex-col max-w-md p-6 "
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold">Book History</h2>
            {(booked.length !== 0 && (
              <div className="flex flex-col gap-2">
                {booked.map((book) => (
                  <div className="container flex flex-col w-full max-w-lg p-2 mx-auto divide-y rounded-md dark:divide-gray-300 bg-purple-200 mt-5">
                    <div className="flex justify-between p-4">
                      <div className="flex space-x-4">
                        <div>
                          <img
                            src={book.user.image}
                            referrerPolicy="no-referrer"
                            alt=""
                            className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{book.user.name}</h4>
                          <span className="text-xs dark:text-gray-600">
                            {book.user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 gap-3">
                      <span className="text-sm dark:text-gray-600">
                        Booked On: {moment(book.createdAt).fromNow()}
                      </span>
                      <button
                        onClick={(e) =>
                          window.open(`mailto:${book.user.email}`)
                        }
                        className="bg-purple-600 p-2 hover:bg-purple-700 duration-300 text-white py-2 rounded-md"
                      >
                        Contact This Guy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )) || (
              <div className="flex flex-col gap-2 p-2 h-[300px] justify-center items-center">
                <p className="text-lg font-semibold opacity-70">
                  No one has booked this room
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RoomMain;
