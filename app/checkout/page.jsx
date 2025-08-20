'use client';
 

 import React, { useState, useEffect } from 'react';
 import { useRouter, useSearchParams } from 'next/navigation';
 import { useSession } from 'next-auth/react';
 import { motion } from 'framer-motion';
 import { Loader2 } from 'lucide-react';
 import { FaRupeeSign } from 'react-icons/fa';
 

 const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
 };
 

 const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
 };
 

 function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const { data: session, status } = useSession();
  const user = session?.user;
 

  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [formData, setFormData] = useState({
  name: user?.name || '',
  email: user?.email || '',
  phone: '',
  address: '',
  });
 

  useEffect(() => {
  if (user) {
  setFormData(prev => ({
  ...prev,
  name: user.name || '',
  email: user.email || '',
  }));
  }
  }, [user]);
 

  useEffect(() => {
  if (!roomId) {
  router.push('/');
  return;
  }
 

  async function fetchRoomDetails() {
  try {
  const res = await fetch(`/api/rooms/${roomId}`);
  const data = await res.json();
  if (res.ok && data.status === 200) {
  setRoomData(data.room);
  } else {
  alert("Error fetching room details.");
  router.push('/');
  }
  } catch (error) {
  console.error("Failed to fetch room details:", error);
  alert("Error fetching room details.");
  router.push('/');
  } finally {
  setLoading(false);
  }
  }
  fetchRoomDetails();
  }, [roomId, router]);
 

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  };
 

  const handleKhaltiPayment = async () => {
  setPaymentLoading(true);
 

  if (!formData.name || !formData.email || !formData.phone || !formData.address) {
  alert("Please fill in all customer and address details.");
  setPaymentLoading(false);
  return;
  }
 

  try {
  const res = await fetch('/api/khalti/initiate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  orderId: roomId,
  amount: roomData?.rent,
  customer: {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  address: formData.address,
  },
  }),
  });
 

  const paymentData = await res.json();
 

  if (paymentData.payment_url) {
  window.location.href = paymentData.payment_url;
  } else {
  throw new Error(paymentData.error || "Failed to initiate Khalti payment.");
  }
  } catch (err) {
  console.error("Error initiating payment:", err);
  alert(`Error processing payment: ${err.message}`);
  setPaymentLoading(false);
  }
  };
 

  if (loading) {
  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 animate-pulse grid md:grid-cols-2 gap-8">
  <div className="space-y-6">
  <div className="h-8 bg-gray-300 rounded-lg w-1/4"></div>
  <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
  <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
  <div className="h-24 bg-gray-300 rounded-lg w-full"></div>
  </div>
  <div className="space-y-6">
  <div className="h-64 bg-gray-300 rounded-xl"></div>
  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
  <div className="h-24 bg-gray-300 rounded-xl w-full"></div>
  </div>
  </div>
  </div>
  );
  }
 

  if (!roomData) {
  return <div className="p-8 text-center text-red-500 bg-gray-100 min-h-screen">Room not found. Please try again.</div>;
  }
 

  return (
  <div className="min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-8 flex justify-center items-center mt-10">
  <motion.div
  className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  >
  {/* Left Side: Your Details */}
  <motion.div className="space-y-8" variants={itemVariants}>
  <h2 className="text-3xl font-semibold">Your Details</h2>
  <div className="space-y-6">
  <div>
  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
  <input
  type="text"
  id="name"
  name="name"
  value={formData.name}
  onChange={handleInputChange}
  placeholder="e.g., Nishant Kafle"
  className="w-full p-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
  />
  </div>
  <div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
  <input
  type="tel"
  id="phone"
  name="phone"
  value={formData.phone}
  onChange={handleInputChange}
  placeholder="e.g., 98XXXXXXXX"
  className="w-full p-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
  />
  </div>
  <div>
  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
  <textarea
  id="address"
  name="address"
  value={formData.address}
  onChange={handleInputChange}
  placeholder="e.g., Jhapa, Province 1"
  rows="3"
  className="w-full p-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
  />
  </div>
  </div>
  </motion.div>
 

  {/* Right Side: Room Description & Booking Summary */}
  <motion.div className="space-y-8" variants={itemVariants}>
  <div className="text-center">
  <h2 className="text-3xl font-semibold mb-2">Checkout</h2>
  <p className="text-gray-600">Complete your room booking</p>
  </div>
 

  {/* Room Details */}
  <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
  {roomData.image && (
  <div className="relative">
  <img
  src={roomData.image}
  alt={roomData.title}
  className="w-full h-64 object-cover"
  />
  </div>
  )}
  <div className="p-6 bg-white">
  <h3 className="text-xl font-semibold text-gray-900">{roomData.title}</h3>
  <p className="text-gray-600 flex items-center gap-1 mt-1">
  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
  {roomData.location}
  </p>
  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
  <div>
  <p className="text-sm text-gray-600">Total Amount</p>
  <p className="text-sm text-gray-500">Monthly rent</p>
  </div>
  <div className="text-right">
  <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
  <FaRupeeSign className="text-green-600" />
  {roomData.rent ? Number(roomData.rent).toLocaleString('en-IN') : '0'}
  </div>
  <p className="text-xs text-gray-500">per month</p>
  </div>
  </div>
  </div>
  </div>
 

  {/* Booking Information */}
  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
  <p className="text-indigo-900">
  You are booking this room for <span className="font-semibold text-indigo-600">one month</span>.
  <br />
  Click "Pay Now" to complete your booking securely via Khalti.
  </p>
  </div>
 

  {/* Payment Button */}
  <motion.button
  onClick={handleKhaltiPayment}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
  disabled={paymentLoading || !roomData}
  variants={itemVariants}
  >
  {paymentLoading ? (
  <>
  <Loader2 className="w-5 h-5 animate-spin" />
  Processing Payment...
  </>
  ) : (
  <>
  Pay Now
  </>
  )}
  </motion.button>
  </motion.div>
  </motion.div>
  </div>
  );
 }
 

 export default CheckoutPage;