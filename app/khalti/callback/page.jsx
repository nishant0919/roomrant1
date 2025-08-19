'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CircleCheck, CircleX, Loader2 } from 'lucide-react'; // Make sure you have lucide-react installed

function KhaltiCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'failed'
    const [message, setMessage] = useState('Verifying your payment, please wait...');

    useEffect(() => {
        const pidx = searchParams.get('pidx');
        const orderId = searchParams.get('orderId');

        // If no payment identifier is found, it's an invalid callback
        if (!pidx || !orderId) {
            setStatus('failed');
            setMessage('Invalid payment callback. Please check your booking history.');
            return;
        }

        const verifyPayment = async () => {
            try {
                // Call your server-side verification endpoint
                const res = await fetch('/api/khalti/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pidx, orderId }),
                });

                const verificationResult = await res.json();
                
                if (verificationResult.success) {
                    setStatus('success');
                    setMessage('Payment successful! Your room has been booked.');
                    // Redirect to the room page or a confirmation page after a short delay
                    setTimeout(() => {
                        router.push(`/room/${orderId}`);
                    }, 3000);
                } else {
                    setStatus('failed');
                    setMessage(verificationResult.message || 'Payment verification failed. Please contact support.');
                }
            } catch (error) {
                console.error("Verification failed:", error);
                setStatus('failed');
                setMessage('An error occurred during payment verification. Please try again later.');
            }
        };

        verifyPayment();
    }, [searchParams, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                {status === 'verifying' && (
                    <>
                        <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{message}</h1>
                        <p className="text-gray-500">Do not close this window.</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CircleCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-green-600 mb-2">{message}</h1>
                        <p className="text-gray-500">Redirecting you to the room page shortly...</p>
                    </>
                )}
                {status === 'failed' && (
                    <>
                        <CircleX className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-red-600 mb-2">{message}</h1>
                        <p className="text-gray-500">
                            You can check your booking status or contact support if the issue persists.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default KhaltiCallbackPage;