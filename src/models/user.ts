import { Schema, model } from 'mongoose';

interface IUser {
  username: string
  password: string
  application: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  application: String,
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;