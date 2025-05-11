import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: String,
    level: String
});

export default mongoose.model('Topic', topicSchema);
