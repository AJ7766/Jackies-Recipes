
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.jackie_jackieredis_3000_REDIS_URL|| 'redis://localhost:6379',
});

redisClient.connect()
.catch(console.error);

redisClient.on('end', () => {
  console.log('Redis connection closed.');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

export default redisClient;

export async function deleteRedisCache(user_id: string) {
  try {
    await redisClient.del(user_id);
  } catch (error) {
    console.error('Error deleting Redis cache:', error);
  }
}

