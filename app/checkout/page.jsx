'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
// Remove the client-side Khalti library import
// import KhaltiCheckout from 'khalti-checkout-web';

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
                if (data.status === 200) {
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
            // Step 1: Initiate payment via your server API
            const res = await fetch('/api/khalti/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: roomId,
                    amount: roomData?.rent,
                    customer: {
                        name: user?.name,
                        email: user?.email,
                        phone: user?.phone || '98XXXXXXXX',
                    },
                }),
            });

            const paymentData = await res.json();
            
            // Check for success and a payment URL from the server response
            if (paymentData.payment_url) {
                // Step 2: Redirect the user to Khalti's payment page
                window.location.href = paymentData.payment_url;
            } else {
                // If no URL is returned, something went wrong on the server
                throw new Error(paymentData.error || "Failed to initiate Khalti payment.");
            }
        } catch (err) {
            console.error("Error initiating payment:", err);
            alert(`Error processing payment: ${err.message}`);
            setPaymentLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading room details...</div>;
    }

    if (!roomData) {
        return <div className="p-8 text-center">Room not found.</div>;
    }

    return (
        <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-10">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="mb-4">
                {/* Dynamically display room image */}
                {roomData.image && (
                    <img 
                        src={roomData.image} 
                        alt={roomData.title} 
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                )}
                <h2 className="text-xl font-semibold">{roomData.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">Location: {roomData.location}</p>
                <p className="text-lg font-bold mt-2">Price: Rs. {roomData.rent} / month</p>
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                You are about to book this room. Click "Pay Now" to complete your booking securely via Khalti.
            </p>
            <button
                onClick={handleKhaltiPayment}
                className="w-full px-6 py-3 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300"
                disabled={paymentLoading || !roomData}
            >
                {paymentLoading ? "Redirecting to Khalti..." : `Pay Now (Rs. ${roomData.rent || 0})`}
            </button>
        </div>
    );
}

export default CheckoutPage;