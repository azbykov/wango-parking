import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  carPlate: { type: String, required: true },
});

export const User = model('User', UserSchema);
