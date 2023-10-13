import mongoose from "mongoose";

// mongoose.set("strictQuery", false);

const db = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB Connected : ${con.connection.host}`);
  } catch (error) {
    console.log("db failed to Connect :", error.message);
    process.exit(1);
  }
};

export default db;
