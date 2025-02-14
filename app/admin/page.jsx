"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /admin/booking when the component mounts
    router.push("/admin/room");
  }, [router]);

  return (
    <div>
      <h1>Loading....</h1>
    </div>
  );
}

export default Page;
