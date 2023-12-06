import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
  type: string;
  coOrdinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IImage extends Document {
  public_id: string;
  url: string;
}
export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternetIncluded: boolean;
  isBreakfastIncluded: boolean;
  isAirconditionIncluded: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Room Name"],
    trim: true,
    maxLength: [200, "Room Name Cannot Exceeds 100 Characters"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Room Name"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please Enter Room Price Per Night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please Enter Room Address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coOrdinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please Enter Room Guest Capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please Enter Number Of Beds In Room"],
  },
  isInternetIncluded: {
    type: Boolean,
    default: false,
  },
  isBreakfastIncluded: {
    type: Boolean,
    default: false,
  },
  isAirconditionIncluded: {
    type: Boolean,
    default: false,
  },
  isPetsAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Room Category"],
    enum: ["King", "Single", "Twins"],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      ratings: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
