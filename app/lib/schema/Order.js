// File: app/lib/schema/Order.js

import mongoose from 'mongoose';

// Main Order Schema for a Room Booking
const OrderSchema = new mongoose.Schema(
    {
        // Use `_id` to store the Khalti `orderId` for easy lookup
        _id: {
            type: String,
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room', // Assumes a 'Room' model exists
            required: true,
        },
        user: {
            // Reference to the authenticated user
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assumes a 'User' model exists
            required: true,
        },
        customer: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
        khaltiDetails: {
            pidx: String,
            transaction_id: String,
            status: String,
        },
    },
    {
        timestamps: true,
    }
);

// Check if the model exists to prevent re-compilation
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;