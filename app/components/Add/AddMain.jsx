// app/components/add/AddMain.jsx
"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Select from "react-select";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

const FeatureOptions = [
  { value: "wifi", label: "Wifi" },
  { value: "ac", label: "AC" },
  { value: "tv", label: "TV" },
  { value: "fridge", label: "Fridge" },
  { value: "kitchen", label: "Kitchen" },
  { value: "laundry", label: "Laundry" },
  { value: "parking", label: "Parking" },
  { value: "security", label: "Security" },
];

const AddMain = () => {
  const router = useRouter();
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState("Preparing for upload...");

  const uploadtoIbb = async (file) => {
    setUploadingStatus("Uploading Image to server...");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        return data.data.url;
      }
      throw new Error("Image upload failed");
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (selectedOptions) => {
    setUserData({ ...userData, features: selectedOptions.map((i) => i.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    if (!image) {
      alert("Please select an image.");
      setUploading(false);
      return;
    }
    if (!userData.description || !userData.rent || !userData.location || !userData.type || !userData.features || userData.features.length === 0) {
      alert("All fields are required.");
      setUploading(false);
      return;
    }

    const imageUrl = await uploadtoIbb(image);
    if (!imageUrl) {
      setUploading(false);
      return;
    }
    
    setUploadingStatus("Finalizing data upload...");

    try {
      const sendData = { ...userData, image: imageUrl };
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const data = await res.json();
      
      if (res.ok) {
        setUploadingStatus("Room added successfully! Redirecting...");
        setTimeout(() => {
          setUploading(false);
          router.push(`/room/${data.id}`);
        }, 1500);
      } else {
        throw new Error(data.message || "Failed to add room.");
      }
    } catch (error) {
      console.error("Server data upload error:", error);
      alert("Failed to add room. Please check your data and try again.");
      setUploading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 py-12">
      {uploading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
          <div className="flex flex-col items-center">
            {uploadingStatus.includes("Successfully") ? (
              <FaCheckCircle className="text-green-500 animate-pulse text-6xl" />
            ) : (
              <AiOutlineCloudUpload className="animate-bounce text-6xl text-white" />
            )}
            <p className="mt-4 font-mono text-center text-sm text-gray-200">{uploadingStatus}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-800">Add a Room</h2>
        <p className="mt-2 text-sm text-gray-500">
          Please fill out the form with genuine information to help others find their perfect space.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Room Image Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700">Room Image</h3>
            <div
              onClick={() => fileRef.current.click()}
              className="mt-2 flex h-52 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 transition-colors duration-300 hover:border-blue-500 hover:bg-gray-200"
            >
              {image ? (
                <div className="relative h-full w-full">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded Room"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white transition-colors duration-300 hover:bg-red-800"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <BiImageAdd size={40} />
                  <span className="mt-2 text-sm font-medium">Click to upload an image</span>
                </div>
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              ref={fileRef}
              type="file"
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="A short description of the room..."
              className="mt-1 block h-32 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              placeholder="e.g., Birtamod, Jhapa, Nepal"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rent" className="text-sm font-medium text-gray-700">Rent per Month (NPR)</label>
            <input
              type="number"
              id="rent"
              name="rent"
              onChange={handleChange}
              placeholder="e.g., 8500"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-medium text-gray-700">Room Type</label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a type</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="family">Family Room</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="features" className="text-sm font-medium text-gray-700">Features</label>
            <Select
              options={FeatureOptions}
              isMulti
              onChange={handleFeatureChange}
              className="mt-1"
              classNamePrefix="react-select"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <svg className="h-5 w-5 animate-spin mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {uploadingStatus}
            </span>
          ) : (
            "Add Room"
          )}
        </button>
      </form>
      
    </div>
  );
};

export default AddMain;