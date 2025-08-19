// File: app/lib/schema/roomSchema.js

import { Mongoose, models, model } from "mongoose";
import { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    // ADD THIS LINE:
    title: {
      type: String,
      required: true,
    },
    // Rest of your schema...
    image: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
    },
    booked: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Room = models.Room || model("Room", roomSchema);

export default Room;