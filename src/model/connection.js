const mongoose = require('mongoose');
const { createClient } = require('redis');

let redisClient;

const connectMongoDB = async (MONGO_URI) => {
  if (!MONGO_URI) {
    throw new Error('MongoDB URI is not provided');
  }
  return mongoose.connect(MONGO_URI);
};

const connectRedis = async (REDIS_CONFIG) => {
  // Destructure REDIS_CONFIG object
  const { password, host, port } = REDIS_CONFIG;

  // Create Redis client with provided configuration
  redisClient = createClient({
    password,
    socket: {
      host,
      port,
    },
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  try {
    await redisClient.connect();
    console.log('Connected to Redis DB....');
  } catch (error) {
    console.error('Failed to connect to Redis:', error.message);
    throw new Error('Could not connect to Redis');
  }

  return redisClient;
};

const getRedisClient = () => {
  if (!redisClient || !redisClient.isReady) {
    throw new Error('Redis client is not connected');
  }
  return redisClient;
};

module.exports = { connectMongoDB, connectRedis, getRedisClient };
