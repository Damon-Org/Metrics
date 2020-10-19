import mongoose from 'mongoose'

const { Schema } = mongoose;

const metrics = new Schema({
    id: { type: Number, required: true },
    played: {
        tracks: Number,
        playlists: Number,
        albums: Number
    }
});

export default mongoose.model('metrics', metrics);