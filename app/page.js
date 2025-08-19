// app/page.jsx
import Landing from "./components/home/Landing";
import RecentCards from "./components/home/RecentCards";
import Stats from "./components/home/Stats";
import ErrorDisplay from "./components/ErrorDisplay";

async function getAllRoom() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/room", {
      cache: "no-store",
    });
    // Check if the response is valid before parsing
    if (!res.ok) {
      // Return a structured error object
      return { status: res.status, rooms: null, message: "Failed to fetch rooms." };
    }
    const data = await res.json();
    // Assuming the API returns a body object, extract the rooms array directly
    // This is the key change to flatten the data structure
    return { status: res.status, rooms: data.body };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { status: 500, rooms: null, message: "Error Connecting to the server." };
  }
}

async function getStat() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/stats", {
      cache: "no-store",
    });
    if (!res.ok) {
      return { status: res.status, stats: null, message: "Failed to fetch stats." };
    }
    const data = await res.json();
    return { status: res.status, stats: data.body };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { status: 500, stats: null, message: "Error Connecting to the server." };
  }
}

export default async function Home() {
  const [roomsData, statsData] = await Promise.all([getAllRoom(), getStat()]);

  // Check for critical data fetching errors that affect the entire page
  if (roomsData.status !== 200 || statsData.status !== 200) {
    return (
      <div className="flex flex-col min-h-screen">
        <Landing />
        <ErrorDisplay message="An error occurred while loading data. Please try again." />
      </div>
    );
  }

  // Pass the rooms array and stats object directly to the components
  return (
    <div>
      <Landing />
      {roomsData.rooms && roomsData.rooms.length > 0 && <RecentCards data={roomsData.rooms} />}
      {statsData.stats && <Stats data={statsData.stats} />}
    </div>
  );
}