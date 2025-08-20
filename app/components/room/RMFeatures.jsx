import React from "react";
import { FaWifi, FaTag, FaUser, FaBed, FaRupeeSign } from "react-icons/fa";

function RMFeatures({ data }) {
  // Map feature names to corresponding icons and labels
  const featuresMap = {
    wifi: { icon: FaWifi, label: "Wi-Fi" },
    balcony: { icon: FaBed, label: "Balcony" },
    single: { icon: FaUser, label: "Single Type" },
    double: { icon: FaUser, label: "Double Type" },
  };

  const featureItems = data.features.map(feature => {
    const featureKey = feature.toLowerCase();
    return featuresMap[featureKey] || { icon: FaTag, label: feature };
  });

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <FaRupeeSign className="text-green-600 text-lg" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              ₹{data?.rent ? Number(data.rent).toLocaleString('en-IN') : "N/A"}
              <span className="text-base font-medium text-gray-600 ml-2">/month</span>
            </p>
            <p className="text-sm text-gray-500">Monthly rent</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Room Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Room Type */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                {featuresMap[data.type.toLowerCase()]?.icon ? (
                  React.createElement(featuresMap[data.type.toLowerCase()].icon, { 
                    className: "text-blue-600 text-base" 
                  })
                ) : (
                  <FaBed className="text-blue-600 text-base" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{data.type}</p>
                <p className="text-sm text-gray-500">Room Type</p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          {featureItems.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  {React.createElement(item.icon, { 
                    className: "text-gray-600 text-base" 
                  })}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-500">Feature</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RMFeatures;