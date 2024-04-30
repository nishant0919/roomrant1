import React from "react";
import MeMain from "../components/me/MeMain";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  return <MeMain />;
}

export default page;
