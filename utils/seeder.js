const Room = require("../models/room");
const mongoose = require("mongoose");

const rooms = require("../data/rooms");

mongoose.connect("mongodb://127.0.0.1:27017/bookit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms Are Deleted");
    await Room.insertMany(rooms);
    console.log("Rooms Are Added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
