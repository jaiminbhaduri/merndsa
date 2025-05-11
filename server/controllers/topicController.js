import mongoose from 'mongoose';
import Topic from '../models/Topic.js';
import User from '../models/User.js';
import Problem from '../models/Problem.js'; // import your Problem model

export const getProblemsByTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const problems = await Problem.find({ topic: topicId });
        res.json(problems);
    } catch (error) {
        console.error('GETPROBLEMSBYTOPIC_ERR', error);
        res.status(500).json({ error: error.message });
    }
};

export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (error) {
        console.error('GETTOPICS_ERR', error);
        res.status(500).json({ error: error.message });
    }
};

export const getProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const completed = user.completedProblems.map(id => id.toString());
        res.json(completed); // return as string IDs for frontend comparison
    } catch (error) {
        console.error('GETPROGRESS_ERR', error);
        res.status(500).json({ error: error.message });
    }
};

export const toggleProblem = async (req, res) => {
    try {
        const { problemId } = req.body;
        const objectId = new mongoose.Types.ObjectId(problemId);

        const user = await User.findById(req.user.id);
        const exists = user.completedProblems.some(id => id.equals(objectId));

        if (exists) {
            user.completedProblems = user.completedProblems.filter(id => !id.equals(objectId));
        } else {
            user.completedProblems.push(objectId);
        }

        await user.save();
        res.json({ completedProblems: user.completedProblems.map(id => id.toString()) });
    } catch (error) {
        console.error('TOGGLEPROBLEM_ERR', error);
        res.status(500).json({ error: error.message });
    }
};
