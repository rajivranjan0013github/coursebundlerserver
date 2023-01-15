import mongoose from "mongoose";

export const connectDb = async () => {
  mongoose.set("strictQuery", true);
  const { connection } = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Data base is connected : ${connection.host}`);
};
