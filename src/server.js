const { connectMongoDB } = require('./model/connection');
const app = require('./index');
const { MONGO_URI, PORT = 5000 } = process.env;

const startServer = async () => {
  try {
    await connectMongoDB(MONGO_URI);
    console.log('Connected to Mongo DB....');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
