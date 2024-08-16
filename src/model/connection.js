const mongoose = require('mongoose');

const connectMongoDB = async (MONGO_URI) => {
  if (!MONGO_URI) {
    throw new Error('MongoDB URI is not provided');
  }
  return mongoose.connect(MONGO_URI);
};

module.exports = { connectMongoDB };
