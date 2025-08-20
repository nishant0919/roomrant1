

import connectToDatabase from '@/app/lib/connect';
import Order from '@/app/lib/schema/Order';
import { NextResponse } from 'next/server';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
    await connectToDatabase();
    try {
        // Find all orders and populate the 'roomId' and 'user' fields.
        // This replaces the IDs with the full documents.
        const orders = await Order.find({})
            .populate({
                path: 'roomId',
                select: 'title location rent' // Select specific fields from the Room model
            })
            .populate({
                path: 'user',
                select: 'name email' // Select specific fields from the User model
            })
            .sort({ createdAt: -1 }); // Sort by newest first

        // Return a successful response with the list of orders.
        return NextResponse.json({ success: true, orders: orders }, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({
            success: false,
            error: 'An error occurred while fetching orders.',
            details: error.message
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
