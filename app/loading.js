import React from "react";

function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
      </div>
    </div>
  );
}

export default loading;
