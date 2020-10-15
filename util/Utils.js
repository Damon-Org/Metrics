/**
 * @param {number} timeout Timeout in ms
 */
export const delay = (timeout) => new Promise((resolve, reject) => setTimeout(resolve, timeout));

/**
 * @param {Main} main
 * @returns {Promise<number>}
 */
export const getServerCount = async (main) => {
    if (main.shard.count === 1) return main.guilds.cache.size;

    try {
        return await main.shard.fetchClientValues('guilds.cache.size').reduce((prev, val) => prev + val, 0);
    } catch (e) {
        return 0;
    }
}

export default {
    delay,
    getServerCount
}
