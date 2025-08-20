'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch('/api/orders/get-all');
                const data = await res.json();
                if (res.ok && data.success) {
                    setOrders(data.orders);
                } else {
                    throw new Error(data.error || 'Failed to fetch orders.');
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                <span className="ml-3 text-gray-600">Loading orders...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500 bg-gray-100 min-h-screen">
                <p>An error occurred: {error}</p>
                <p>Please check your server and database connection.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-4xl font-bold text-gray-900 mb-8"
                    variants={itemVariants}
                >
                    All Orders
                </motion.h1>

                {orders.length === 0 ? (
                    <motion.div
                        className="p-10 text-center bg-white rounded-xl shadow-md"
                        variants={itemVariants}
                    >
                        <p className="text-xl text-gray-600">No orders found yet.</p>
                    </motion.div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Room Booked
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <motion.tr key={order._id} variants={itemVariants}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order._id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <p className="font-semibold text-gray-900">{order.customer.name}</p>
                                            <p className="text-xs text-gray-500">{order.customer.email}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.roomId ? (
                                                <>
                                                    <p className="font-semibold">{order.roomId.title}</p>
                                                    <p className="text-xs text-gray-500">{order.roomId.location}</p>
                                                </>
                                            ) : (
                                                'Room not found'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <FaRupeeSign className="text-green-600" />
                                                <span className="ml-1 text-green-600 font-bold">
                                                    {Number(order.amount).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                                order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default AdminOrdersPage;
