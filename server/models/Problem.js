import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: String,
    youtube: String,
    leetcode: String,
    article: String,
    level: String,
    topic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
});

export default mongoose.model('Problem', problemSchema);
