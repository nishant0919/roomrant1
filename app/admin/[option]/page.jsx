import Booking from "@/app/components/Admin/Booking";
import Room from "@/app/components/Admin/Room";

import React from "react";

async function Page({ params }) {
  
    const { option } = params;
    const optionList = ["room", "booking"];

    if (!optionList.includes(option)) {
        return <h1>404 - Not Found</h1>;
    }

    return (
        <div className="w-full">
            {option === "room" && <Room />}
            {option === "booking" && <Booking />}
        </div>
    );
}

export default Page;
