"use client";
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react"; // Importing icons

export default function UserDetail() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/user/all");
        const res = await response.json();
        setUsers(res.users);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold mt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-semibold mt-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-5 shadow-lg rounded-xl border transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* User Image */}
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
            />

            {/* User Info */}
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <User size={16} className="text-gray-600" />
                {user.role}
              </p>
            </div>

            {/* User Details */}
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-gray-600" />
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
