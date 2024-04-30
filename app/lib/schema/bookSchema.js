import { Schema, models, model } from "mongoose";

const bookedSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booked = models.Booked || model("Booked", bookedSchema);
export default Booked;
