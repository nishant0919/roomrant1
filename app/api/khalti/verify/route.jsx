// File: app/api/khalti/verify/route.js

import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-api-key",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  console.log('Received request for Khalti verification API.');
  await dbConnect();
  try {
    const { pidx, orderId } = await req.json();

    const verifyRes = await fetch('https://a.khalti.com/api/v2/epayment/lookup/', {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await verifyRes.json();
    console.log('Khalti API response:', data);

    if (data.status === 'Completed') {
      // FIX: Use data.total_amount instead of data.amount
      const khaltiAmount = data.total_amount ? parseFloat(data.total_amount) / 100 : NaN;

      console.log('Parsed amount from Khalti:', khaltiAmount);

      if (isNaN(khaltiAmount)) {
        console.error('Verification failed: Khalti response contained an invalid amount.');
        return new NextResponse(JSON.stringify({ success: false, message: 'Invalid amount in payment response.' }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            paymentStatus: 'paid',
            khaltiDetails: {
              pidx: data.pidx,
              transaction_id: data.transaction_id,
              amount: khaltiAmount,
              status: data.status,
              message: data.message,
            },
          },
        },
        { new: true }
      );

      return new NextResponse(JSON.stringify({ success: true, order: updatedOrder }), {
        status: 200,
        headers: corsHeaders,
      });
    } else {
      console.error('Khalti verification status not completed:', data.status);
      return new NextResponse(JSON.stringify({ success: false, status: data.status, message: data.message }), {
        status: 400,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    console.error('Detailed Verification Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Verification failed', details: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}