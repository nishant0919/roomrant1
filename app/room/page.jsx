import SearchMain from "@/app/components/search/SearchMain";
import { redirect } from "next/navigation";
import React from "react";
import RoomMain from "../components/room/ROomHome";

async function getSearch() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/room");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch search data");
  }
}

async function page({}) {
  const data = await getSearch();
  return (
    <div className="w-full">
      <RoomMain data={data.body} />
    </div>
  );
}

export default page;
