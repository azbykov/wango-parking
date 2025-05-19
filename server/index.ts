import express from 'express';
import ViteExpress from 'vite-express';

import {connectToMongo} from './db';

import authRoutes from './routes/auth';
import parkingRoutes from './routes/parking';
import cityRoutes from './routes/city';


const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', parkingRoutes);
app.use('/api', cityRoutes);

if (process.env.VITE_CLIENT_DIR) {
  process.chdir(process.env.VITE_CLIENT_DIR);
}
connectToMongo().then(() => {
  const port = Number(process.env.PORT) || 3000;
  ViteExpress.listen(app, port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});

export default app;
