"use client";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function Stats({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [stats, setStats] = useState({
    Rooms: 0,
    Users: 0,
    Booked: 0,
  });

  useEffect(() => {
    if (!isInView) {
      setStats({
        Rooms: 0,
        Users: 0,
        Booked: 0,
      });
      return;
    }

    const animateStats = () => {
      let rooms = data.rooms;
      let users = data.user;
      let booked = data.booked;

      if (rooms < 10) {
        rooms = "0" + rooms;
      }
      if (booked < 10) {
        booked = "0" + booked;
      }
      if (users < 10) {
        users = "0" + users;
      }

      let targetStats = {
        Rooms: rooms ? rooms : 18,
        Users: users ? users : 25,
        Booked: booked ? booked : 30,
      };

      let intervals = Object.keys(stats).map((stat) => {
        return setInterval(() => {
          setStats((prevStats) => ({
            ...prevStats,
            [stat]:
              prevStats[stat] < targetStats[stat]
                ? prevStats[stat] + 1
                : targetStats[stat],
          }));
        }, 50);
      });

      return () => {
        intervals.forEach((interval) => clearInterval(interval));
      };
    };

    if (isInView) {
      setTimeout(() => {
        animateStats();
      }, 500);
    } else {
      setStats({
        Rooms: 0,
        Users: 0,
        Posted: 0,
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="p-6 dark:bg-gray-100 dark:text-gray-800">
      <h2 className="text-4xl">Some of our achievements</h2>
      <div className="flex flex-col gap-4">
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex flex-col justify-start m-2 lg:m-6">
              <p className="text-4xl font-bold leading-none lg:text-6xl">
                {value}
              </p>
              <p className="text-sm sm:text-base">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
