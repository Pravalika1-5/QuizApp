const mongoose = require("mongoose");
const config = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
