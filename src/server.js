const { connectRedis, connectMongoDB } = require('./model/connection');
const app = require('./index');
const logger = require('./utils/winston.utils');
const { MONGO_URI, REDIS_URL, PORT = 5000 } = process.env;

const startServer = async () => {
  try {
    await connectRedis(REDIS_URL);
    console.log('Connected to Redis DB....');

    await connectMongoDB(MONGO_URI);
    console.log('Connected to Mongo DB....');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Error starting server', err);
    console.log('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
