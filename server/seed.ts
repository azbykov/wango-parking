// server/seed.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { City } from './models/City'
import { Area } from './models/Area'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log('✅ Connected to MongoDB')

        await City.deleteMany()
        await Area.deleteMany()

        const newYork = await City.create({
            name: 'New York',
            rates: [
                { from: '00:00', to: '23:59', price: 5 }
            ]
        })

        const washington = await City.create({
            name: 'Washington',
            rates: [
                { from: '08:00', to: '20:00', price: 2 },
                { from: '20:00', to: '08:00', price: 5 }
            ]
        })

        await Area.insertMany([
            { name: 'Brooklyn', city: newYork._id },
            { name: 'Manhattan', city: newYork._id },
            { name: 'Queens', city: newYork._id },
            { name: 'Downtown', city: washington._id },
            { name: 'Capitol Hill', city: washington._id },
        ])

        console.log('🌱 Seed completed successfully')
        process.exit(0)
    } catch (err) {
        console.error('❌ Seed failed', err)
        process.exit(1)
    }
}

seed()
