import { Schema, model } from 'mongoose';

const CitySchema = new Schema({
  name: { type: String, required: true, unique: true },
  rates: [
    {
      from: { type: String, required: true },
      to: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ]
});

export const City = model('City', CitySchema);
