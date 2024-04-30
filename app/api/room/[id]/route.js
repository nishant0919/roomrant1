import connectToDatabase from "@/app/lib/connect";
import Room from "@/app/lib/schema/roomSchema";
import User from "@/app/lib/schema/userSchema";
import Booked from "@/app/lib/schema/bookSchema";

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  try {
    const room = await Room.findById(id).populate("author");
    if (room) {
      const booked = await Booked.find({ room: id }).populate("user");

      return Response.json({
        body: room,
        booked,
        status: 200,
      });
    }

    return Response.json({
      message: "Room not found",
      status: 404,
    });
  } catch (error) {
    return Response.json({
      message: "Room not found",
      status: 404,
      error: error.message,
    });
  }
}
