import Footer from "./components/home/Footer";
import Landing from "./components/home/Landing";
import Options from "./components/home/Options";
import RecentCards from "./components/home/RecentCards";
import Stats from "./components/home/Stats";

async function getAllRoom() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/room", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error Connecting to Internet");
  }
}

async function getStat() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/stats", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error Connecting to Internet");
  }
}

export default async function Home() {
  const data = await getAllRoom();
  const stats = await getStat();

  // check for Internet connection first

  return (
    <div>
      <Landing />
      <Options />
      {data.status == 200 && <RecentCards data={data.body} />}
      {stats.status == 200 && <Stats data={stats.body} />}
      <Footer />
    </div>
  );
}
