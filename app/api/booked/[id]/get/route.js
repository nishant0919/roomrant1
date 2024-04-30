import Booked from "@/app/lib/schema/bookSchema";
import User from "@/app/lib/schema/userSchema";
import Room from "@/app/lib/schema/roomSchema";
import connectToDatabase from "@/app/lib/connect";

export async function GET(request, { params }) {
  await connectToDatabase();
  const { id } = params;
  try {
    const booked = await Booked.find({ room: id }).populate("user");
    if (booked.length > 0) {
      return Response.json({
        body: booked,
        status: 200,
      });
    }
    return Response.json({
      message: "Booking Empty",
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
