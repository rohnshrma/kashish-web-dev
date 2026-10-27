import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/kd-tdl-db",
    );
    console.log("DB CONNECTED : ", conn.connection.host);
  } catch (err) {
    console.error("Failed to connect to DB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
