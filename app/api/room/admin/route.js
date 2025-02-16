import connectToDatabase from "@/app/lib/connect";
import Room from "@/app/lib/schema/roomSchema";

export async function GET(request, { params }) {
  await connectToDatabase();
  try {
    const rooms = await Room.find({})
      .populate("author", "name")
      .sort({ createdAt: -1 });
    return Response.json({
      body: rooms,
      status: 200,
    });
  } catch (error) {
    return Response.json({
      message: "Room not found",
      status: 404,
      error: error.message,
    });
  }
}
