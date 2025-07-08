const mongoose = require('mongoose');

let bucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize GridFS Bucket (modern approach)
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    return bucket;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const getBucket = () => bucket;

module.exports = { connectDB, getBucket };