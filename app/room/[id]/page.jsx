import RoomMain from "@/app/components/room/RoomMain";
import React from "react";
import HomeButton from "@/app/components/HomeButton";

async function fetchData(id) {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/room/" + id, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const data = await fetchData(id);
  if (data.status === 404) {
    return {
      title: "Room not found",
      description: "This room does not exist.",
    };
  }
  let title =
    data.body.description.length > 20
      ? data.body.description.substring(0, 20) + "..."
      : data.body.description;
  return {
    title: title,
    description: data.body.description,
    openGraph: {
      title: title,
      description: data.body.description,
      type: "website",
      url: process.env.NEXT_PUBLIC_URL + "/room/" + id,
      image: {
        url: data.body.image,
        alt: title,
      },
    },
  };
}

async function page({ params }) {
  const { id } = params;
  const data = await fetchData(id);
  if (data.status === 404) {
    return (
      <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <HomeButton />
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="p-2 w-full">
      <RoomMain data={data.body} booked={data.booked} id={id} />
    </div>
  );
}

export default page;
