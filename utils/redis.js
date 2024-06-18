import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('connect', () => {
      console.log('Redis client connected');
    });
    this.client.on('error', (error) => {
      console.log(`Redis client not connected: ${error.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
