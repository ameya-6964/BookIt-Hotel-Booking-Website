import { rooms } from "./data";
import Room from "../backend/models/room";
import mongoose from "mongoose";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookit-v2");

    await Room.deleteMany();
    console.log("Rooms Are Deleted");
    await Room.insertMany(rooms);
    console.log("Rooms Are Added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
