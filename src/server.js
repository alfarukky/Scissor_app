const { connectRedis, connectMongoDB } = require('./model/connection');
const app = require('./index');
const logger = require('./utils/winston.utils');
const {
  MONGO_URI,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  PORT = 5000,
} = process.env;

const startServer = async () => {
  try {
    // Create Redis configuration object
    const redisConfig = {
      password: REDIS_PASSWORD || '',
      host: REDIS_HOST || '127.0.0.1',
      port: parseInt(REDIS_PORT, 10) || 6379,
    };

    await connectRedis(redisConfig);
    await connectMongoDB(MONGO_URI);

    app.listen(PORT, () => {
      console.log('Connected to Mongo DB....');
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Error starting server', err);
    console.log('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
