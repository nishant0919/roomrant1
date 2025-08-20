import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt, FaUser, FaRupeeSign } from "react-icons/fa";

const Cards = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link href={`/room/${data._id}`} className="block h-full">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            alt={data.title || "Room image"}
            src={data.image}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold shadow-sm">
            ₹{data.rent ? Number(data.rent).toLocaleString('en-IN') : 'N/A'}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {data.title || data.name || "Untitled Room"}
          </h3>
          
          <div className="flex items-center gap-1 text-gray-600 mb-2">
            <FaMapMarkerAlt className="text-gray-400 text-sm" />
            <span className="text-sm">
              {data.location.length > 25
                ? data.location.substring(0, 25) + "..."
                : data.location}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <FaUser className="text-gray-400 text-sm" />
            <span className="text-sm">{data.author?.name || "Unknown Host"}</span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {data.description.length > 80
              ? data.description.substring(0, 80) + "..."
              : data.description}
          </p>

          {/* Features Preview */}
          {data.features && data.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {data.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {feature}
                </span>
              ))}
              {data.features.length > 2 && (
                <span className="text-gray-500 text-xs">+{data.features.length - 2} more</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-green-600">
              ₹{data.rent ? Number(data.rent).toLocaleString('en-IN') : 'N/A'}
              <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
