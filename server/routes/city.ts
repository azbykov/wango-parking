import express from 'express';
import { City } from '../models/City';
import { Area } from '../models/Area';

const router = express.Router();

router.get('/cities', async (_, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cities' });
  }
});

router.get('/cities/:id/areas', async (req, res) => {
  try {
    const areas = await Area.find({ city: req.params.id });
    res.status(200).json(areas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch areas' });
  }
});

export default router;
