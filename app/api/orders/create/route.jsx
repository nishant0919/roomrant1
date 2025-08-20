// File: app/api/orders/create/route.jsx

import connectToDatabase from '@/app/lib/connect';
import Order from '@/app/lib/schema/Order';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        const { roomId, amount, customer } = await req.json();

        // Use the room ID as the order's primary key for easy lookup later
        const newOrder = await Order.create({
            _id: roomId, // Use roomId as _id for direct linking
            roomId: roomId,
            user: userId || null, // Assuming userId is a valid ObjectId
            customer: customer, // 💡 Add the customer object here
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