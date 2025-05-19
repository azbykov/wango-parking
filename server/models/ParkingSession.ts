import { Schema, model, Types } from 'mongoose';

const ParkingSessionSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  area: { type: Types.ObjectId, ref: 'Area', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  price: { type: Number },
});

export const ParkingSession = model('ParkingSession', ParkingSessionSchema);
