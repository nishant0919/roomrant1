import SearchMain from "@/app/components/search/SearchMain";
import { redirect } from "next/navigation";
import React from "react";

async function getSearch(e) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/search/" + e);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch search data");
  }
}

async function page({ params }) {
  const { query } = params;
  if (!query) {
    redirect("/");
  }
  const data = await getSearch(query);
  return (
    <div className="w-full">
      <SearchMain data={data.body} query={query} />
    </div>
  );
}

export default page;
