import Room from "../models/room";

import ErrorHandler from "../utils/errorHandler";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

//! Get All Rooms => /api/rooms

const allRooms = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;

  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
});

//! Create New Rooms => /api/rooms

const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});

//! Get Room Details From ID => /api/rooms/:id

const getSingleRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room Not Found With This ID", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

//! Update Room Details From ID => /api/rooms/:id

const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room Not Found With This ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    room,
  });
});

//! Delete Room From ID => /api/rooms/:id

const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room Not Found With This ID", 404));
  }

  await room.remove();
  res.status(200).json({
    success: true,
    message: "Room Successfully Deleted",
  });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
