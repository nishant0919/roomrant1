import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Booked from "@/app/lib/schema/bookSchema";
import User from "@/app/lib/schema/userSchema";
import Room from "@/app/lib/schema/roomSchema";
import connectToDatabase from "@/app/lib/connect";

export async function GET(request, { params }) {
  await connectToDatabase();
  const session = await getServerSession({ authOptions });
  const { id } = params;
  if (!session) {
    return Response.json({
      message: "Unauthorized",
      status: 401,
    });
  }
  const email = session.user.email;
  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({
      message: "User not found",
      status: 404,
    });
  }
  try {
    const room = await Room.findById(id).populate("author");
    if (room) {
      // check if room is already booked
      const booked = await Booked.findOneAndDelete({
        room: id,
        user: user._id,
      });
      if (!booked) {
        return Response.json({
          message: "Error deleting booking",
          status: 400,
        });
      }
      return Response.json({
        message: "Booking deleted",
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
