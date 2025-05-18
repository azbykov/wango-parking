import { Schema, model, Types } from 'mongoose'

const AreaSchema = new Schema({
    name: { type: String, required: true },
    city: { type: Types.ObjectId, ref: 'City', required: true },
})

export const Area = model('Area', AreaSchema)
