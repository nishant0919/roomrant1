import User from "@/app/lib/schema/userSchema";
import connectToDatabase from "@/app/lib/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Room from "@/app/lib/schema/roomSchema";
import Booked from "@/app/lib/schema/bookSchema";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({
      message: "Unauthorized",
      status: 401,
    });
  }
  await connectToDatabase();
  const email = session.user.email;
  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({
      message: "User not found",
      status: 404,
    });
  }
  try {
    const rooms = await Room.find({ author: user._id }).sort({ createdAt: -1 });
    const booked = await Booked.find({ user: user._id }).populate("room");
    return Response.json({
      body: { rooms, booked, user },
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
