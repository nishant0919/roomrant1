import React from "react";
import { FaWifi, FaTag, FaDollarSign, FaUser, FaBed } from "react-icons/fa";

function RMFeatures({ data }) {
  // Map feature names to corresponding icons and labels
  const featuresMap = {
    wifi: { icon: FaWifi, label: "Wi-Fi" },
    balcony: { icon: FaBed, label: "Balcony" }, // Example
    single: { icon: FaUser, label: "Single Type" },
    double: { icon: FaUser, label: "Double Type" },
  };

  const featureItems = data.features.map(feature => {
    const featureKey = feature.toLowerCase();
    return featuresMap[featureKey] || { icon: FaTag, label: feature };
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <FaDollarSign className="text-violet-600 text-xl" />
        <p className="text-2xl font-bold text-violet-600">
          Rs.{data?.rent || "N/A"}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
          {featuresMap[data.type.toLowerCase()]?.icon ? (
            React.createElement(featuresMap[data.type.toLowerCase()].icon, { className: "text-violet-600" })
          ) : (
            <FaBed className="text-violet-600" />
          )}
          <span>Type: {data.type}</span>
        </div>
        {featureItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            {React.createElement(item.icon, { className: "text-violet-600" })}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RMFeatures;