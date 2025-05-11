import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getTopics, getProgress, toggleProblem, getProblemsByTopic } from '../controllers/topicController.js';

const router = express.Router();

router.get('/', authMiddleware, getTopics);
router.get('/progress', authMiddleware, getProgress);
router.post('/toggle', authMiddleware, toggleProblem);
router.get('/problems/:topicId', authMiddleware, getProblemsByTopic);

export default router;
