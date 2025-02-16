"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { status } = useSession();
  const navigate = useRouter();
  if (status === "unauthenticated") {
    navigate.push("/login");
  }
  function createuser() {
    fetch("/api/user/create", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "exist") {
          navigate.push("/");
        } else {
          navigate.push("/");
        }
      });
  }
  useEffect(() => {
    if (status === "authenticated") createuser();
  }, []);

  return <div>Loading</div>;
}

export default page;
