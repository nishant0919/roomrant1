// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/home/Footer";
import SessionProvider from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import connectToDatabase from "./lib/connect";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickRoom | Home",
  description: "Find your next room to rent",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  await connectToDatabase();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <NextTopLoader
            showSpinner={false}
            color="purple"
            height="5"
            showOnScrollUp={true}
            progressDuration={0.5}
            easingType="easeInOut"
          />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer/>
        </body>
      </SessionProvider>
    </html>
  );
}