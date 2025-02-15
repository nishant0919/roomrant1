import React from "react";
import Compo from "./Compo";

async function Page({ params }) {
  const { option } = params;
  const optionList = ["room", "users"];

  if (!optionList.includes(option)) {
    return <h1>404 - Not Found</h1>;
  }

  return <Compo option={option} />;
}

export default Page;
