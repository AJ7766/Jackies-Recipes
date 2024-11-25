import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export const deleteCache = async (username: string) => {
    const keys = cache.keys();
    const deleted = cache.del(username);

    return deleted;
}

export default cache; 