import Model from '../schemas/MetricSchema.js'

export const createIfNotExists = () => {
    return new Promise((resolve, reject) => {
        Model.findOne({ id: 1 })
            .then((doc) => {
                if (!doc) {
                    const create = new Model({
                        'id': 1,
                        'played.tracks': 0,
                        'played.playlists': 0,
                        'played.albums': 0
                    }).save();

                    resolve(create);
                }

                resolve(doc);
            })
            .catch((err) => reject(err));
    });
};

export const increasePlayCount = (type) => {
    const update = { 
        $inc: { 
            'played.tracks': type === 'track' ? 1 : 0, 
            'played.playlists': type === 'playlist' ? 1 : 0, 
            'played.albums': type === 'album' ? 1 : 0 
        } 
    };

    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({ id: 1 }, update)
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
};