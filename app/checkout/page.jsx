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

    const handleKhaltiPayment = async () => {
        setPaymentLoading(true);
        try {
            const res = await fetch('/api/khalti/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: roomId,
                    amount: roomData?.rent,
                    customer: {
                        name: user?.name || "Guest",
                        email: user?.email || "guest@example.com",
                        phone: user?.phone || '98XXXXXXXX',
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
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mt-4"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!roomData) {
        return <div className="p-8 text-center text-red-500">Room not found. Please try again.</div>;
    }

    return (
        <div className="flex justify-center items-center pt-20 min-h-screen bg-gray-50 p-4">
            <motion.div
                className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 text-center">
                    <motion.h1 
                        className="text-3xl font-bold mb-2"
                        variants={itemVariants}
                    >
                        Checkout
                    </motion.h1>
                    <p className="text-blue-100">Complete your room booking</p>
                </div>

                <div className="p-8">
                    {/* Room Details */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        {roomData.image && (
                            <div className="relative mb-6">
                                <img 
                                    src={roomData.image} 
                                    alt={roomData.title} 
                                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h2 className="text-2xl font-bold">{roomData.title}</h2>
                                    <p className="text-gray-200 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {roomData.location}
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                    
                    {/* Amount Section */}
                    <motion.div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6" variants={itemVariants}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xl font-semibold text-gray-800 mb-1">
                                    Total Amount
                                </p>
                                <p className="text-sm text-gray-600">Monthly rent</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-green-600 flex items-center gap-1">
                                    <FaRupeeSign className="text-green-600" />
                                    {roomData.rent ? Number(roomData.rent).toLocaleString('en-IN') : '0'}
                                </div>
                                <p className="text-sm text-gray-500">per month</p>
                            </div>
                        </div>
                    </motion.div>
                
                    {/* Customer Info */}
                    <motion.div className="card p-6 mb-8" variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-black mb-4">Customer Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium  text-black">{user?.name || 'Guest'}</p>
                                    <p className="text-sm  text-black">Full Name</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium  text-black">{user?.email || 'No email'}</p>
                                    <p className="text-sm  text-black">Email Address</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Information */}
                    <motion.div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-8 border border-blue-200 dark:border-blue-800" variants={itemVariants}>
                        <p className="text-center text-black ">
                            You are booking this room for <span className="font-semibold text-blue-600 dark:text-blue-400">one month</span>. 
                            <br />
                            Click "Pay Now" to complete your booking securely via Khalti.
                        </p>
                    </motion.div>

                    {/* Payment Button */}
                    <motion.button
                        onClick={handleKhaltiPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
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
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                Pay Now
                            </>
                        )}
                    </motion.button>

                    {/* Security Notice */}
                    <motion.div className="mt-6 text-center" variants={itemVariants}>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Secure payment powered by Khalti
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default CheckoutPage;