import Model from '../schemas/MetricSchema.js'

export const createIfNotExists = async () => {
    const doc = await Model.findOne({ id: 1 }).exec();
    if (doc) return doc;

    return new Model({
        'id': 1,
        'played.tracks': 0,
        'played.playlists': 0,
        'played.albums': 0
    }).save();
};

export const increasePlayCount = (type) => {
    const update = {
        $inc: {
            'played.tracks': type === 'track' ? 1 : 0,
            'played.playlists': type === 'playlist' ? 1 : 0,
            'played.albums': type === 'album' ? 1 : 0
        }
    };

    return Model.findOneAndUpdate({ id: 1 }, update).exec();
};

export default {
    createIfNotExists,
    increasePlayCount
};
