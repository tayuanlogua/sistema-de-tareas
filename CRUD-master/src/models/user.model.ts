import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface representing a user document.
 * @interface User
 * @extends Document
 */
interface User extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for user data.
 * @const userSchema
 * @type {Schema<User>}
 */
const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose model for the User schema.
 * @const User
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model<User>("User", userSchema);

export default User;
