// File: app/api/orders/[orderId]/route.js

import connectToDatabase from '@/app/lib/connect';
import Order from '@/app/lib/schema/Order';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectToDatabase();
    try {
        const { orderId } = params;

        if (!orderId) {
            return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order: order }, { status: 200 });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ success: false, error: 'An error occurred while fetching the order.' }, { status: 500 });
    }
}