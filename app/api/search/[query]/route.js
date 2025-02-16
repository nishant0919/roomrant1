import Room from "@/app/lib/schema/roomSchema";

export async function GET(response, { params }) {
  const { query } = params;

  try {
    // Fetch rooms based on search query
    const rooms = await Room.find({
      $or: [
        { description: { $regex: query, $options: "i" } }, // Search in description field
        { features: { $regex: query, $options: "i" } }, // Search in features field (assuming it's an array)
        { location: { $regex: query, $options: "i" } }, // Search in location field
        { type: { $regex: query, $options: "i" } },
      ],
      approved: true, // Ensure the room is approved
    });

    return Response.json({ status: 200, body: rooms });
  } catch (error) {
    return Response.json({
      status: 500,
      error: "Internal Server Error",
      err: error,
    });
  }
}
