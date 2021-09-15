import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/expense-manager'

const options: mongoose.ConnectOptions = {
  autoIndex: false,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

mongoose.connect(MONGO_URI, options)

export default mongoose;