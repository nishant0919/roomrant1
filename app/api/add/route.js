import Room from "@/app/lib/schema/roomSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/lib/schema/userSchema";
import connectToDatabase from "@/app/lib/connect";

export async function POST(request) {
  const session = await getServerSession({ authOptions });
  await connectToDatabase();
  if (!session) {
    return Response.json({ message: "Unauthorized" });
  }
  const email = session.user.email;
  const getAuthor = await User.findOne({ email });
  if (!getAuthor) {
    return Response.json({ message: "User not found" });
  }
  const author = getAuthor._id;

  const res = await request.json();
  if (!res) return Response.json({ message: "No data found" });
  if (!res.description)
    return Response.json({ message: "Description is required" });
  if (!res.rent) return Response.json({ message: "Rent is required" });
  if (!res.location) return Response.json({ message: "Location is required" });
  if (!res.type) return Response.json({ message: "Type is required" });
  if (!res.features) return Response.json({ message: "Features are required" });
  if (!res.image) return Response.json({ message: "image are required" });

  res.author = author;

  const room = new Room(res);
  await room.save();
  return Response.json({ message: "Room added successfully", id: room._id });
}

export async function GET(request) {
  return Response.json({ message: "Hello World" });
}
