import BaseModule from './structures/BaseModule.js'
import { UpdateInterval } from './util/Constants.js'
import Util from './util/Utils.js'

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
                    mod: 'commandHandler',
                    name: 'command',
                    call: '_onCommandExecuted'
                }
            ]
        });
    }

    /**
     * @param {Class} instance The class instance of the command
     * @param {Message} msgObj The discord message object
     * @param {string[]} args The arguments passed when the command ran
     * @param {boolean} mentioned If the command was triggered through a mention
     */
    _onCommandExecuted(instance, msgObj, args, mentioned) {
        
    }

    /**
     * @private
     */
    _onReady() {
        this.log.info('METRICS', 'Starting Metrics loop.');

        this._updateLoop();
    }

    async _updateLoop() {
        this.globalStorage.set('serverCount', await Util.getServerCount(this._m));

        await Util.delay(UpdateInterval);

        this._updateLoop();
    }

    setup() {
        return true;
    }
}
