"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AddMain from "../components/Add/AddMain";

function page() {
  const navigate = useRouter();
  const fileRef = useRef(null);
  const { data, status } = useSession();
  if (status === "unauthenticated") {
    navigate.push("/login");
    return null;
  }

  return <AddMain />;
}

export default page;
