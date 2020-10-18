import BaseModule from './structures/BaseModule.js'
import Constants, { UpdateInterval } from './util/Constants.js'
import Util from './util/Utils.js'

import { createIfNotExists, increasePlayCount } from './structures/models/MetricsModel.js'

export default class Metrics extends BaseModule {
    /**
     * @param {Main} main
     */
    constructor(main) {
        super(main);

        this.register(Metrics, {
            name: 'metrics',
            scope: 'global',
            requires: ['commandHandler'],
            events: [
                {
                    name: 'ready',
                    call: '_onReady'
                },
                {
                    mod: 'mongodb',
                    name: 'ready',
                    call: '_mongoReady'
                }
            ]
        });

        this._ready = false;
    }

    get constants() {
        return Constants;
    }

    get util() {
        return Util;
    }

    /**
     * @private
     */
    _onReady() {
        this.log.info('METRICS', 'Starting Metrics loop.');

        if(this._ready) {
            this._m.on('trackPlayed', _ => {
                increasePlayCount('track');
            });

            this._m.on('playlistPlayed', _ => {
                increasePlayCount('playlist');
            });

            this._m.on('albumPlayed', _ => {
                increasePlayCount('album');
            });
        }

        this._updateLoop();
    }

    /**
     * @private
     */
    async _updateLoop() {
        this.globalStorage.set('serverCount', await Util.getServerCount(this._m));

        await Util.delay(UpdateInterval);

        this._updateLoop();
    }

    /**
     * @private
     */
    async _mongoReady() {
        if(await createIfNotExists().length < 1) {
            this.log.error('METRICS', 'Could not create initial collection.');

            return false;
        }

        this._ready = true;

        return true;
    }

    setup() {
        return true;
    }
}
