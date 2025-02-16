"use client";

import { useEffect, useState } from "react";
import { FaBed, FaTag, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

async function fetchRooms() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/admin`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
}

function AdminRoomPage() {
  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [changeStatusLoaidng, setChangeStatusLoaidng] = useState(false);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRooms();
        setRooms(data.body);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  const changeApproved = async (id) => {
    setChangeStatusLoaidng(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/room/${id}/approved`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }
      const data = await res.json();
      console.log("Approved Room:", data);
      router.refresh();
    } catch (error) {
      console.error("Error approving room:", error);
    } finally {
      setChangeStatusLoaidng(false);
    }
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading rooms...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!Array.isArray(rooms)) {
    return null;
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center mt-10">
        No rooms found. Please add a room.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Rooms Posted by Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => openModal(room)}
            >
              <img
                src={room.image || "/default-image.jpg"}
                alt={room.name}
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-image.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FaMapMarkerAlt className="text-white text-2xl" />
                <span className="text-white ml-2">{room?.location}</span>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold">{room.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{room.description}</p>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <div className="flex items-center ml-4">
                  <FaTag className="mr-1" />
                  <span>Rs.{room.rent} per night</span>
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <FaUser className="mr-1" />
                <span>Posted by: {room.author?.name}</span>{" "}
                {/* Display author name */}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => changeApproved(room._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  {changeStatusLoaidng
                    ? "Loading..."
                    : room.approved
                    ? "Approved"
                    : "Approve"}
                </button>

                <button
                  onClick={() => openModal(room)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRoom && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">{selectedRoom.name}</h2>
            <img
              src={selectedRoom.image || "/default-image.jpg"}
              alt={selectedRoom.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-image.jpg";
              }}
            />
            <p className="text-gray-600">{selectedRoom.description}</p>
            <p className="text-lg font-semibold mt-2">
              Price:{" "}
              <span className="text-gray-500">Rs.{selectedRoom.rent}</span>
            </p>
            <p className="text-lg font-semibold mt-2">
              Location:{" "}
              <span className="text-gray-500">{selectedRoom.location}</span>
            </p>
            <div className="mt-2">
              <strong>Features:</strong>
              <ul className="list-disc ml-4">
                {selectedRoom.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoomPage;
