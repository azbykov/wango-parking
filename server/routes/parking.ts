import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { ParkingSession } from '../models/ParkingSession';
import { Area } from '../models/Area';

const router = express.Router();

router.post('/start-parking', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const { areaId } = req.body;
  const userId = req.userId;

  if (!areaId) {
    res.status(400).json({ message: 'Missing areaId' });
    return;
  }

  try {
    const area = await Area.findById(areaId);
    if (!area) {
      res.status(404).json({ message: 'Area not found' });
      return;
    }

    const session = await ParkingSession.create({
      user: userId,
      area: (area as any)._id,
      startTime: new Date(),
    });

    const populated = await ParkingSession.findById(session._id).populate({
      path: 'area',
      populate: { path: 'city' }
    });
    res.status(201).json({ message: 'Parking started', session: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/stop-parking', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const session = await ParkingSession.findOne({ user: userId, endTime: null })
      .populate({ path: 'area', populate: { path: 'city' } });

    if (!session || !(session.area as any).city) {
      res.status(404).json({ message: 'No active parking session or city info missing' });
      return;
    }

    const endTime = new Date();
    const city = (session.area as any).city;
    const rates = (city as any).rates || [];
    const price = calculateParkingPrice(session.startTime, endTime, rates);

    session.endTime = endTime;
    session.price = price;
    await session.save();

    res.status(200).json({ message: 'Parking stopped', session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/parkings', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const sessions = await ParkingSession.find({ user: userId }).populate({
      path: 'area',
      populate: { path: 'city' },
    }).sort({ startTime: -1 });

    res.status(200).json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch parking sessions' });
  }
});

function calculateParkingPrice(start: Date, end: Date, rates: { from: string; to: string; price: number }[]): number {
  let total = 0;
  let current = new Date(start);

  while (current < end) {
    const currentHM = current.toTimeString().substring(0, 5); // "HH:MM"

    for (const rate of rates) {
      if (isTimeInRange(currentHM, rate.from, rate.to)) {
        total += rate.price;
        break;
      }
    }

    current.setHours(current.getHours() + 1);
  }

  return total;
}

function isTimeInRange(time: string, from: string, to: string): boolean {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const t = toMinutes(time);
  const f = toMinutes(from);
  const tt = toMinutes(to);

  return f <= tt ? (t >= f && t < tt) : (t >= f || t < tt);
}

export default router;
