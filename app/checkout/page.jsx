'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Loader2, DollarSign } from 'lucide-react';

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
        <div className="flex justify-center items-center **mt-32** min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <motion.div
                className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6"
                    variants={itemVariants}
                >
                    Checkout Details
                </motion.h1>
                <motion.div className="mb-6" variants={itemVariants}>
                    {roomData.image && (
                        <img 
                            src={roomData.image} 
                            alt={roomData.title} 
                            className="w-full h-56 object-cover rounded-xl shadow-md mb-4"
                        />
                    )}
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{roomData.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        <span className="font-medium">Location:</span> {roomData.location}
                    </p>
                </motion.div>
                
                <motion.div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6" variants={itemVariants}>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Total Amount
                    </p>
                    <p className="text-2xl font-extrabold text-green-600 dark:text-green-400 flex items-center">
                        <DollarSign className="w-6 h-6 mr-1" />
                        {roomData.rent}
                    </p>
                </motion.div>
                
                <motion.p 
                    className="mb-6 text-center text-gray-700 dark:text-gray-300"
                    variants={itemVariants}
                >
                    You are booking this room for one month. Click "Pay Now" to complete your booking securely via Khalti.
                </motion.p>
                
                <motion.button
                    onClick={handleKhaltiPayment}
                    className="w-full flex items-center justify-center px-6 py-4 text-white font-bold bg-violet-600 rounded-xl shadow-lg hover:bg-violet-700 transition-colors duration-300 disabled:bg-violet-400 disabled:cursor-not-allowed"
                    disabled={paymentLoading || !roomData}
                    variants={itemVariants}
                >
                    {paymentLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Redirecting...
                        </>
                    ) : (
                        `Pay Now`
                    )}
                </motion.button>
            </motion.div>
        </div>
    );
}

export default CheckoutPage;