import { createClient } from 'redis';
interface CachedUserProps {
  username: string;
  userContent: { profilePicture?: string }
}

const redisClient = createClient({
  url: process.env.jackie_jackieredis_3000_REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect()
  .catch(console.error);

redisClient.on('end', () => {
  console.log('Redis connection closed.');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});
//await redisClient.flushDb();

export default redisClient;

export const setRedisCache = async (username: string, data: CachedUserProps) => {
  await redisClient.set(username, JSON.stringify(data), { EX: 3600 });
}

export const getRedisCache = async (username: string): Promise<CachedUserProps | null> => {
  try {
    const data = await redisClient.get(username);
    if (!data) 
      return null;
    
    return JSON.parse(data) as CachedUserProps;
  } catch (error) {
    console.error('Error getting Redis cache:', error);
    return null;
  }
};
export const delRedisCache = async (user_id: string) => {
  try {
    await redisClient.del(user_id);
  } catch (error) {
    console.error('Error deleting Redis cache:', error);
  }
}

