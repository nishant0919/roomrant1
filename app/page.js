// app/page.jsx
import Footer from "./components/home/Footer";
import Landing from "./components/home/Landing";
import RecentCards from "./components/home/RecentCards";
import Stats from "./components/home/Stats";
import ErrorDisplay from "./components/ErrorDisplay"; // New component for error messages

async function getAllRoom() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/room", {
      cache: "no-store",
    });
    // Check if the response is valid before parsing
    if (!res.ok) {
      return { status: res.status, body: { message: "Failed to fetch rooms." } };
    }
    const data = await res.json();
    return { status: res.status, body: data };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { status: 500, body: { message: "Error Connecting to the server." } };
  }
}

async function getStat() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/stats", {
      cache: "no-store",
    });
    if (!res.ok) {
      return { status: res.status, body: { message: "Failed to fetch stats." } };
    }
    const data = await res.json();
    return { status: res.status, body: data };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { status: 500, body: { message: "Error Connecting to the server." } };
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
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Landing />
      {roomsData.body && roomsData.body.length > 0 && <RecentCards data={roomsData.body} />}
      {statsData.body && <Stats data={statsData.body} />}
      <Footer />
    </div>
  );
}