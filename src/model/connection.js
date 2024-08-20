const mongoose = require('mongoose');
const { createClient } = require('redis');
let redisClient;

const connectMongoDB = async (MONGO_URI) => {
  if (!MONGO_URI) {
    throw new Error('MongoDB URI is not provided');
  }
  return mongoose.connect(MONGO_URI);
};

const connectRedis = async (REDIS_URL) => {
  redisClient = createClient(REDIS_URL);
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();
  return redisClient;
};

const getRedisClient = () => redisClient;

module.exports = { connectMongoDB, connectRedis, getRedisClient };
