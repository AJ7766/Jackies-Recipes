import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export const deleteCache = async (username: string) => {
    const deleted = cache.del(username);
    if (!deleted)
        throw new Error('Failed to delete cached user');
    return deleted;
}

export default cache; 