import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGO_URI } from './config.js';

import authRoutes from './routes/authRoutes.js';
import topicRoutes from './routes/topicRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

} catch (error) {
    console.error('MongoDB connection error:', error);
}