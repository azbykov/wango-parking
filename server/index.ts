import express from 'express';
import ViteExpress from 'vite-express';
import path from 'path';

import {connectToMongo} from './db';

import authRoutes from './routes/auth';
import parkingRoutes from './routes/parking';


const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', parkingRoutes);

if (process.env.VITE_CLIENT_DIR) {
    process.chdir(process.env.VITE_CLIENT_DIR)
}
connectToMongo().then(() => {
    ViteExpress.listen(app, 3000, () => {
        console.log('🚀 Server running at http://localhost:3000')
    })
})
