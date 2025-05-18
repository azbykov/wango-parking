// server/routes/auth.ts
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

const router = express.Router()

// POST /api/register
router.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { email, fullName, address, carPlate } = req.body

    if (!email || !fullName || !address || !carPlate) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = await User.create({ email, fullName, address, carPlate })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        res.status(201).json({ message: 'User registered', user, token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    const { email, carPlate } = req.body

    if (!email || !carPlate) {
        return res.status(400).json({ message: 'Missing email or carPlate' })
    }

    try {
        const user = await User.findOne({ email, carPlate })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        res.status(200).json({ message: 'Login successful', user, token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router
