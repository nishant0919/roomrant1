// File: app/api/rooms/[id]/route.jsx

import connectToDatabase from '@/app/lib/connect';
import Room from '@/app/lib/schema/roomSchema';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await connectToDatabase();
    const { id } = params;

    try {
        const room = await Room.findById(id);

        if (!room) {
            return new NextResponse(JSON.stringify({ status: 404, message: "Room not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new NextResponse(JSON.stringify({ status: 200, room }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ status: 500, message: "Internal server error", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}