import User from "@/app/lib/schema/userSchema";
import connectToDatabase from "@/app/lib/connect";
import Room from "@/app/lib/schema/roomSchema";
import Booked from "@/app/lib/schema/bookSchema";

export async function GET(request, { params }) {
  await connectToDatabase();

  const user = await User.find();
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    const booked = await Booked.find();
    const stats = {
      rooms: rooms.length,
      booked: booked.length,
      user: user.length,
    };
    return Response.json({
      body: stats,
      status: 200,
    });
  } catch (error) {
    return Response.json({
      message: "No Stat Fetched",
      status: 404,
      error: error.message,
    });
  }
}
