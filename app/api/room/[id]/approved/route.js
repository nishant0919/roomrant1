import connectToDatabase from "@/app/lib/connect";
import Room from "@/app/lib/schema/roomSchema";

export async function PUT(request, { params }) {
  const { id } = params;

  if (!id) {
    return Response.json({
      message: "Room not found",
      status: 404,
    });
  }

  await connectToDatabase();
  try {
    const rooms = await Room.find({
      _id: id,
    })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    if (rooms.length === 0) {
      return Response.json({
        message: "No room found",
        status: 404,
      });
    }

    //   if room, update approved status
    const room = await Room.findOneAndUpdate(
      { _id: id },
      { approved: true },
      { new: true }
    );

    return Response.json({
      body: room,
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
