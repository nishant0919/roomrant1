import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SessionProvider from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import connectToDatabase from "./lib/connect";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Room4Rent | Home",
  description: "Find your next room to rent",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession({ authOptions });
  await connectToDatabase();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <NextTopLoader
            showSpinner={false}
            color="purple"
            height="5"
            showOnScrollUp={true}
            showOnScrolling={false}
            progressDuration={0.5}
            easingType="easeInOut"
          />
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
