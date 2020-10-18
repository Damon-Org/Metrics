import mongoose from 'mongoose'

const { Schema } = mongoose;

const metrics = new Schema({
    id: Number,
    played: Object
}, { collection: 'Metrics' });

export default mongoose.model('Metrics', metrics);