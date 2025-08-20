// File: app/api/khalti/initiate/route.jsx

import { NextResponse } from 'next/server';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-api-key",
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
    try {
        const { orderId, amount, customer } = await req.json();

        // 💡 Step 1: Create a pending order in your database
        const createOrderRes = await fetch(`${process.env.STORE_URL}/api/orders/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId: orderId, amount, customer }),
        });

        const createOrderData = await createOrderRes.json();
        if (!createOrderData.success) {
            console.error("Failed to create order in database:", createOrderData.details);
            throw new Error(createOrderData.error || 'Failed to create order in database.');
        }

        // 💡 Step 2: Initiate payment with Khalti using the same order ID
        const khaltiRes = await fetch('https://a.khalti.com/api/v2/epayment/initiate/', {
            method: 'POST',
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                return_url: `${process.env.STORE_URL}/khalti/callback?orderId=${orderId}`,
                website_url: process.env.STORE_URL,
                amount: amount * 100, 
                purchase_order_id: orderId,
                purchase_order_name: `Order ${orderId}`,
                customer_info: customer,
            }),
        });

        const data = await khaltiRes.json();

        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    } catch (error) {
        console.error('Error in Khalti initiate:', error);
        return new NextResponse(JSON.stringify({ error: 'Error initiating payment', details: error.message }), {
            status: 500,
            headers: corsHeaders,
        });
    }
}