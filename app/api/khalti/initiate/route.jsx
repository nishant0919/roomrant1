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
    return new NextResponse(JSON.stringify({ error: 'Error initiating payment', details: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
