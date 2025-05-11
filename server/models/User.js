import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    completedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
});

export default mongoose.model('User', userSchema);
