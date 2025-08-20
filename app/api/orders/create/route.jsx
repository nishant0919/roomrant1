// File: app/api/orders/create/route.jsx

import connectToDatabase from '@/app/lib/connect';
import Order from '@/app/lib/schema/Order';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth"; // 💡 This is no longer used, but kept for context
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 💡 This is no longer used, but kept for context


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-api-key",
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
    await connectToDatabase();
    try {
        // 💡 The user session logic is removed to allow orders without a userId
        // const session = await getServerSession(authOptions);
        // const userId = session?.user?.id;

        const { roomId, amount, customer } = await req.json();

        const newOrder = await Order.create({
            _id: roomId,
            roomId: roomId,
            user: null, // 💡 The user field is now explicitly set to null
            customer: customer,
            amount: amount,
            paymentStatus: 'pending',
        });

        return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201, headers: corsHeaders });
    } catch (error) {
        console.error('Detailed Error creating order:', error);
        return NextResponse.json({
            success: false,
            error: 'Error creating order',
            details: error.message,
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}